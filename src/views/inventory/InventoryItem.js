import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCardFooter,
  CForm,
  CFormGroup,
  CInput,
  CLabel
} from '@coreui/react'

import { API } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { updateInventoryItem as updateInventoryItemMutation, deleteInventoryItem as deleteInventoryItemMutation } from '../../graphql/mutations';
import { useHistory } from "react-router-dom";

import { Modal } from '@coreui/coreui'

const InventoryItem = ({ match }) => {

  const [inventoryItem, setInventoryItem] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchInventoryItem(match.params.id);
  }, []);

  async function fetchInventoryItem(id) {
    const apiData = await API.graphql({ query: queries.getInventoryItem, variables: { id: id } });
    console.log("Current version: " + apiData.data.getInventoryItem._version);
    setInventoryItem(apiData.data.getInventoryItem);
    console.log("Form State: " + apiData.data.getInventoryItem.brand);
  }

  async function updateInventoryItem() {

    try {
      await API.graphql({
        query: updateInventoryItemMutation, variables: {
          input: {
            id: inventoryItem.id,
            name: inventoryItem.name,
            quantity: inventoryItem.quantity,
            description: inventoryItem.description,
            brand: inventoryItem.brand,
            category: inventoryItem.category,
            _version: inventoryItem.version
          }
        }
      });
      showConfirmation("Update Successful", "'" + inventoryItem.name + "' was updated successfully")
    } catch (e) {
      console.log(e);
    }

  }

  async function deleteInventoryItem() {

    try {
        await API.graphql({ query: deleteInventoryItemMutation, variables: { input: { id: inventoryItem.id } } });
        showConfirmation("Delete Successful", "'" + inventoryItem.name + "' was deleted successfully")
    } catch (e) {
      console.log(e);
    }

  }

  function showConfirmation(title, text) {
    var modalElement = document.getElementById('confirmationModal');
    modalElement.addEventListener("hidden.coreui.modal", function(){  history.push("/inventory"); });
    var confirmationModal = new Modal(modalElement);
    document.getElementById('confirmationModalLabel').innerText = title;
    document.getElementById('confirmationModalText').innerText = text;
    confirmationModal.show();
  }

  function returnToInventory() {
    history.push("/inventory");  
  }

  return (
    <>

      <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmationModalLabel"></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label id="confirmationModalText"></label>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Inventory Item
          </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="name" id="name" name="name" placeholder="Enter Name..." autoComplete="name"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'name': e.target.value })} value={inventoryItem.name} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="quantity">Quantity</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="quantity" id="quantity" name="quantity" placeholder="Enter Quantity..." autoComplete="quantity"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'quantity': e.target.value })} value={inventoryItem.quantity} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="description">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="description" id="description" name="description" placeholder="Enter Description..." autoComplete="description"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'description': e.target.value })} value={inventoryItem.description} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="brand">Brand</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="brand" id="brand" name="brand" placeholder="Enter Brand..." autoComplete="brand"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'brand': e.target.value })} value={inventoryItem.brand} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="brand">Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="category" id="category" name="category" placeholder="Enter Category..." autoComplete="category"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'category': e.target.value })} value={inventoryItem.category} />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="cancel" size="sm" color="danger" onClick={returnToInventory}><CIcon name="cil-ban" /> Cancel</CButton>
              <CButton type="delete" size="sm" color="warning" onClick={() => deleteInventoryItem()} ><CIcon name="cil-x-circle" /> Delete</CButton>
              <span class="span-right"><CButton type="update" size="sm" color="primary" onClick={() => updateInventoryItem()}><CIcon name="cil-check-circle" /> Update</CButton></span>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow>
    </>
  )
}

export default InventoryItem
