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
    CDataTable,
    CPagination
} from '@coreui/react'

import { API } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { updateJob as updateJobMutation, deleteJob as deleteJobMutation } from '../../graphql/mutations';
import { useHistory } from "react-router-dom";

import { Modal } from '@coreui/coreui'

const Job = ({ match }) => {

    const [job, setJob] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [currentInventoryPage, setActiveInventoryPage] = useState(1)
    const [startDate, setStartDate] = useState(new Date());

    const history = useHistory();

    useEffect(() => {
        fetchJob(match.params.id);
    }, []);

    async function fetchJob(id) {
        console.log("entered job");
        const apiData = await API.graphql({ query: queries.getJobWithInventory, variables: { id: id } });
        console.log("Current version: " + apiData.data.getJob._version);
        console.log("Current job id: " + apiData.data.getJob.id);

        // apiData.data.getJob.inventory.items.map(item => { console.log("Inventory ID: " + item.inventoryItem.name) });
        setJob(apiData.data.getJob);

        var inventoryItemArray = new Array();
        apiData.data.getJob.inventory.items.map(item => { inventoryItemArray.push({name: item.inventoryItem.name, quantity: item.inventoryItem.quantity})});

        setInventoryItems(inventoryItemArray);

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
        modalElement.addEventListener("hidden.coreui.modal", function () { history.push("/jobs"); });
        var confirmationModal = new Modal(modalElement);
        document.getElementById('confirmationModalLabel').innerText = title;
        document.getElementById('confirmationModalText').innerText = text;
        confirmationModal.show();
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

            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            Job
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
                                <CFormGroup row>
                                <CDataTable
                                items={inventoryItems}
                                fields={[
                                    { key: 'name', _classes: 'font-weight-bold' },'quantity'
                                ]}
                                itemsPerPage={5}
                                hover
                                striped
                                pagination
                                clickableRows
                                />
                                <CPagination
                                activePage={currentInventoryPage}
                                pages={10}
                                onActivePageChange={(i) => setActiveInventoryPage(i)}
                                ></CPagination>
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
            </CRow>
        </>
    )
}

export default Job
