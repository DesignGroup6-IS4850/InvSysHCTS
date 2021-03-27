import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { API } from 'aws-amplify';
import { createInventoryItem as createInventoryItemMutation } from '../../graphql/mutations';

import { useHistory } from "react-router-dom";

import { Modal } from '@coreui/coreui';

const initialFormState = { name: '', quantity: 0, description: '', brand: '', category: '' }

const NewInventoryItem = () => {

  const [inventoryItem, setInventoryItem] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  async function createInventoryItem() {
    if (!formData.name || !formData.description) return;

    try {
      setInventoryItem([...inventoryItem, formData]);
      await API.graphql({ query: createInventoryItemMutation, variables: { input: formData } });

      showConfirmation("Add Successful", "'" + formData.name + "' was added successfully")
    } catch (e) {
      console.log(e);
    }

    setFormData(initialFormState);
  }

  function resetForm() {
    setFormData(initialFormState);
  }

  function returnToInventory() {
    history.push("/inventory");  
  }

  function showConfirmation(title, text) {
    var modalElement = document.getElementById('confirmationModal');
    modalElement.addEventListener("hidden.coreui.modal", function () { history.push("/inventory"); });
    var confirmationModal = new Modal(modalElement);
    document.getElementById('confirmationModalLabel').innerText = title;
    document.getElementById('confirmationModalText').innerText = text;
    confirmationModal.show();
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
              New Inventory Item
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="name" id="name" name="name" placeholder="Enter Name..." autoComplete="name"
                      onChange={e => setFormData({ ...formData, 'name': e.target.value })} value={formData.name} />
                    <CFormText className="help-block">Please enter item name</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="quantity">Quantity</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="quantity" id="quantity" name="quantity" placeholder="Enter Quantity..." autoComplete="quantity"
                      onChange={e => setFormData({ ...formData, 'quantity': e.target.value })} value={formData.quantity} />
                    <CFormText className="help-block">Please enter quantity</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="description">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="description" id="description" name="description" placeholder="Enter Description..." autoComplete="description"
                      onChange={e => setFormData({ ...formData, 'description': e.target.value })} value={formData.description} />
                    <CFormText className="help-block">Please enter description</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="brand">Brand</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="brand" id="brand" name="brand" placeholder="Enter Brand..." autoComplete="brand"
                      onChange={e => setFormData({ ...formData, 'brand': e.target.value })} value={formData.brand} />
                    <CFormText className="help-block">Please enter brand</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="brand">Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="category" id="category" name="category" placeholder="Enter Category..." autoComplete="category"
                      onChange={e => setFormData({ ...formData, 'category': e.target.value })} value={formData.category} />
                    <CFormText className="help-block">Please enter category</CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="cancel" size="sm" color="danger" onClick={returnToInventory}><CIcon name="cil-ban" /> Cancel</CButton>
              <CButton type="clear" size="sm" color="info" onClick={resetForm}><CIcon name="cil-scrubber" /> Clear</CButton>
              <span class="span-right"><CButton type="submit" size="sm" color="success" onClick={createInventoryItem}><CIcon name="cil-check-circle" /> Submit</CButton></span>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow>
    </>
  )
}

export default NewInventoryItem
