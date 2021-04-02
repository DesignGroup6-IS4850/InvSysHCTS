import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CCardFooter,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CSelect,
    CDataTable
} from '@coreui/react'

import { API } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { updateJob as updateJobMutation, deleteJob as deleteJobMutation} from '../../graphql/mutations';
import {updateJobInventory as updateJobInventoryMutation} from '../../graphql/mutations';
import { useHistory, useLocation } from "react-router-dom";
import { listInventoryItems } from '../../graphql/queries';

import { Modal } from '@coreui/coreui';

const Job = ({ match }) => {

    const [job, setJob] = useState([]);
    const [materialList, setMaterialList] = useState([]);
    const [currentMaterialItem, setCurrentMaterialItem] = useState(null);
    const [newQuantity, setNewQuantity] = useState(null);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    const fields = [
        { key: 'name', _style: { width: '40%' } },
        'quantity',
        { key: 'brand', _style: { width: '20%' } },
        { key: 'category', _style: { width: '20%' } },
        {
            key: 'edit',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'remove',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }

    ]

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    }

    const toggleRemoveModal = () => {
        setShowRemoveModal(!showRemoveModal);
    }

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    }

    const history = useHistory();


    useEffect(() => {
        fetchJob(match.params.id);
    }, []);

    useEffect(() => {
        fetchInventoryItems();
    }, []);


    async function fetchInventoryItems() {
        const apiData = await API.graphql({ query: listInventoryItems });
        setInventoryItems(apiData.data.listInventoryItems.items);
    }

    async function fetchJob(id) {
        console.log("entered job");
        const apiData = await API.graphql({ query: queries.getJobWithInventory, variables: { id: id } });
        console.log("Current version: " + apiData.data.getJob._version);
        console.log("Current job id: " + apiData.data.getJob.id);

        // apiData.data.getJob.inventory.items.map(item => { console.log("Inventory ID: " + item.inventoryItem.name) });
        setJob(apiData.data.getJob);

        var materialListArray = new Array();
        apiData.data.getJob.inventory.items.map(item => {
            materialListArray.push(
                {
                    id: item.id, name: item.inventoryItem.name,
                    quantity: item.jobQuantity, brand: item.inventoryItem.brand,
                    category: item.inventoryItem.category
                })
        });

        setMaterialList(materialListArray);

        console.log("Form State: " + apiData.data.getJob.name);
    }

    async function updateJob() {

        try {
            await API.graphql({
                query: updateJobMutation, variables: {
                    input: {
                        id: job.id,
                        name: job.name,
                        startDate: job.startDate,
                        endDate: job.endDate,
                        _version: job.version
                    }
                }
            });
            showConfirmation("Update Successful", "'" + job.name + "' was updated successfully")
        } catch (e) {
            console.log(e);
        }

    }

    async function updateMaterialItem() {

        currentMaterialItem.quantity = newQuantity;
        console.log("Item: " + currentMaterialItem.name + ", id: " + currentMaterialItem.id + ", quantity: " + currentMaterialItem.quantity);
        try {
            await API.graphql({
                query: updateJobInventoryMutation, variables: {
                    input: {
                        id: currentMaterialItem.id,
                        jobQuantity: parseInt(newQuantity, 10)
                    }
                }
            });
            showConfirmation("Update Successful", "'" + currentMaterialItem.name + "' was updated successfully")
            var materialListTable = document.getElementById('materialListTable');
        } catch (e) {
            console.log(e);
        }

    }

    async function deleteJob() {

        try {
            await API.graphql({ query: deleteJobMutation, variables: { input: { id: job.id } } });
            showConfirmation("Delete Successful", "'" + job.name + "' was deleted successfully")
        } catch (e) {
            console.log(e);
        }

    }

    function showConfirmation(title, text) {
        var modalElement = document.getElementById('confirmationModal');
        // modalElement.addEventListener("hidden.coreui.modal", function () { history.push("/jobs"); });
        var confirmationModal = new Modal(modalElement);
        document.getElementById('confirmationModalLabel').innerText = title;
        document.getElementById('confirmationModalText').innerText = text;
        confirmationModal.show();
    }

    function launchAddModal() {
        var modalElement = document.getElementById('addModal');
        var addModal = new Modal(modalElement);
        var optionHtml;
        for (const inventoryItem of inventoryItems) {
            optionHtml = optionHtml + "<option value=\'" + inventoryItem.id + "\'>" + inventoryItem.name + "</option>"
        }
        document.getElementById('selectInventory').innerHTML = optionHtml;
        document.getElementById('addQuantityInput').value = "";
        toggleAddModal();
    }

    function launchEditModal(item) {
        setCurrentMaterialItem(item);
        setNewQuantity(item.quantity);
        var modalElement = document.getElementById('editModal');
        var editModal = new Modal(modalElement);
        document.getElementById('editModalTitle').innerHTML = "Edit " + item.name + "?";
        document.getElementById('itemNameText').innerHTML = item.name;
        toggleEditModal();
    }

    function launchRemoveModal(item) {
        var modalElement = document.getElementById('removeModal');
        var removeModal = new Modal(modalElement);
        document.getElementById('removeModalTitle').innerHTML = "Remove " + item.name + "?";
        document.getElementById('removeModalText').innerHTML = "Are you sure you wish to remove " + item.name + "?";
        toggleRemoveModal();
    }

    function cancelRemoveModal() {
        toggleRemoveModal();
    }

    function okRemoveModal() {
        /*         var inventoryItem = inventoryItems.find(item => item.id == currentItem.id);
                if (inventoryItem != null) {
                    inventoryItem.change = "delete";
                    itemsToDelete.push(inventoryItem);
                    let pos = inventoryItems.indexOf(inventoryItem);
                    inventoryItems.splice(pos, 1);
                } */
        toggleRemoveModal();
    }

    function cancelAddModal() {
        toggleAddModal();
    }

    function okAddModal() {
        /*         var inventoryItem = allInventoryItems.find(item => item.id == newInventoryItemId);
                if (inventoryItem != null) {
                    var selectedInventoryItem = {id:inventoryItem.id, name:inventoryItem.name, quantity:newQuantity, change:'new'};
                    inventoryItems.push(selectedInventoryItem);
                }       */
        toggleAddModal();
    }

    function cancelEditModal() {
        toggleEditModal();
    }

    function okEditModal() {
        /*         var inventoryItem = allInventoryItems.find(item => item.id == newInventoryItemId);
                if (inventoryItem != null) {
                    var selectedInventoryItem = {id:inventoryItem.id, name:inventoryItem.name, quantity:newQuantity, change:'new'};
                    inventoryItems.push(selectedInventoryItem);
                }       */
        updateMaterialItem();
        toggleEditModal();
    }

    function returnToJobs() {
        history.push("/jobs");
    }

    return (
        <>

            <div className="modal fade" id="confirmationModal" tabIndex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmationModalLabel"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label id="confirmationModalText"></label>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <CModal
                id="removeModal"
                show={showRemoveModal}
                onClose={toggleRemoveModal}
            >
                <CModalHeader id="removeModalTitle"></CModalHeader>
                <CModalBody>
                    <div className="modal-body">
                        <label id="removeModalText"></label>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={okRemoveModal}>OK</CButton>{' '}
                    <CButton color="secondary" onClick={cancelRemoveModal}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                id="addModal"
                show={showAddModal}
                onClose={toggleAddModal}
            >
                <CModalHeader id="addModalTitle"></CModalHeader>
                <CModalBody>
                    <CForm action="" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="selectInventory">Inventory Item</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CSelect id="selectInventory" name="selectInventory" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="addQuantity">Quantity</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="addQuantityInput" name="addQuantityInput" placeholder="Enter Quantity..." />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={okAddModal}>OK</CButton>{' '}
                    <CButton color="secondary" onClick={cancelAddModal}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                id="editModal"
                show={showEditModal}
                onClose={toggleEditModal}
            >
                <CModalHeader id="editModalTitle"></CModalHeader>
                <CModalBody>
                    <CForm action="" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="itemNameText">Item</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CLabel id="itemNameText" name="itemNameText" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="quantityText">Quantity</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="quantityText" name="quantityText" placeholder="Enter Quantity..." 
                                value={newQuantity} onChange={(event) => setNewQuantity(event.target.value)}/>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={okEditModal}>OK</CButton>{' '}
                    <CButton color="secondary" onClick={cancelEditModal}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            Job Detail
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="name">Name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="name" id="name" name="name" placeholder="Enter Name..." autoComplete="name"
                                            onChange={e => setJob({ ...job, 'name': e.target.value })} value={job.name} />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="startDate">Start Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="date" id="startDate" name="startDate" placeholder="Enter Start Date..." autoComplete="startDate"
                                            onChange={e => setJob({ ...job, 'startDate': e.target.value })} value={job.startDate} />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="endDate">End Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="date" id="endDate" name="endDate" placeholder="Enter End Date..." autoComplete="endDate"
                                            onChange={e => setJob({ ...job, 'endDate': e.target.value })} value={job.endDate} />
                                    </CCol>
                                </CFormGroup>



                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="cancel" size="sm" color="danger" onClick={returnToJobs}><CIcon name="cil-ban" /> Cancel</CButton>
                            <CButton type="delete" size="sm" color="warning" onClick={() => deleteJob()} ><CIcon name="cil-x-circle" /> Delete</CButton>
                            <span class="span-right"><CButton type="update" size="sm" color="primary" onClick={() => updateJob()}><CIcon name="cil-check-circle" /> Update</CButton></span>
                        </CCardFooter>
                    </CCard>
                </CCol>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            Job Material List
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row>
                                    <CCol xs="12" md="12">
                                        <div><CButton type="button" size="sm" color="info" onClick={() => { launchAddModal() }}>
                                            <CIcon name="cil-plus" /> Add Materials</CButton></div>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol id="tableCol">
                                        <CDataTable 
                                            id="materialListTable" 
                                            items={materialList}
                                            fields={fields}
                                            columnFilter
                                            tableFilter
                                            footer
                                            itemsPerPageSelect
                                            itemsPerPage={5}
                                            hover
                                            sorter
                                            pagination
                                            scopedSlots={{
                                                'edit':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton type="button" size="sm" color="info" onClick={() => { launchEditModal(item) }}>
                                                                    <CIcon name="cil-pencil" /></CButton>
                                                            </td>
                                                        )
                                                    },
                                                'remove':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton type="button" size="sm" color="danger"  onClick={() => { launchRemoveModal(item) }}>
                                                                    <CIcon name="cil-trash" /></CButton>
                                                            </td>
                                                        )
                                                    }
                                            }}
                                        />



                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )

}

export default Job
