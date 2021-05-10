import React, { useState } from 'react';
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

import NewInventoryItemHelpModal from '../help/NewInventoryItemHelpModal'

const initialFormState = { name: '', quantity: 0, description: '', brand: '', category: '', lowInventoryThreshold: 0 }

const NewInventoryItem = () => {

  const [inventoryItem, setInventoryItem] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  async function createInventoryItem() {
    if (!validateFormData()) return;

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
    clearValidationMessages();
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

  function ensureNumeric(value) {
    var newValue = parseInt(value, 10);
    if (Number.isNaN(newValue)) {
      newValue = 0;
    }
    return newValue;
  }

  function validateFormData() {

    var errorCount = 0;

    var nameInput = document.getElementById("name");
    var quantityInput = document.getElementById("quantity");
    var descriptionInput = document.getElementById("description");
    var brandInput = document.getElementById("brand");
    var categoryInput = document.getElementById("category");
    var lowInventoryThresholdInput = document.getElementById("lowInventoryThreshold");

    nameInput.classList.remove("is-invalid");
    nameInput.classList.remove("is-valid");

    quantityInput.classList.remove("is-invalid");
    quantityInput.classList.remove("is-valid");

    descriptionInput.classList.remove("is-invalid");
    descriptionInput.classList.remove("is-valid");

    brandInput.classList.remove("is-invalid");
    brandInput.classList.remove("is-valid");

    categoryInput.classList.remove("is-invalid");
    categoryInput.classList.remove("is-valid");

    lowInventoryThresholdInput.classList.remove("is-invalid");
    lowInventoryThresholdInput.classList.remove("is-valid");


    if (nameInput.value == '') {
      nameInput.classList.add("is-invalid");
      // return false;
      errorCount++;
    } else {
      nameInput.classList.add("is-valid");
    }

    if (descriptionInput.value == '') {
      descriptionInput.classList.add("is-invalid");
      // return false;
      errorCount++;
    } else {
      descriptionInput.classList.add("is-valid");
    }

    if (brandInput.value == '') {
      brandInput.classList.add("is-invalid");
      // return false;
      errorCount++;
    } else {
      brandInput.classList.add("is-valid");  
    }

    if (categoryInput.value == '') {
      categoryInput.classList.add("is-invalid");
      // return false;
      errorCount++;
    } else {
      categoryInput.classList.add("is-valid");  
    }


    try {
      parseInt(quantityInput.value, 10);
      categoryInput.classList.add("is-valid"); 
    } catch (e) {
      categoryInput.classList.add("is-invalid");
      // return false; 
      errorCount++;
    }

    try {
      parseInt(lowInventoryThresholdInput.value, 10);
      lowInventoryThresholdInput.classList.add("is-valid"); 
    } catch (e) {
      lowInventoryThresholdInput.classList.add("is-invalid");
      // return false; 
      errorCount++;
    }

    return (errorCount == 0);

  }

  function clearValidationMessages() {
    var nameInput = document.getElementById("name");
    var quantityInput = document.getElementById("quantity");
    var descriptionInput = document.getElementById("description");
    var brandInput = document.getElementById("brand");
    var categoryInput = document.getElementById("category");

    nameInput.classList.remove("is-invalid");
    nameInput.classList.remove("is-valid");

    quantityInput.classList.remove("is-invalid");
    quantityInput.classList.remove("is-valid");         

    descriptionInput.classList.remove("is-invalid");
    descriptionInput.classList.remove("is-valid");   

    brandInput.classList.remove("is-invalid");
    brandInput.classList.remove("is-valid");   

    categoryInput.classList.remove("is-invalid");
    categoryInput.classList.remove("is-valid");   

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
              <h5>New Inventory Item<span class="span-right"><NewInventoryItemHelpModal/></span></h5>
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
                    <div class="invalid-feedback">Name must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="quantity">Quantity</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="quantity" id="quantity" name="quantity" placeholder="Enter Quantity..." autoComplete="quantity"
                      onChange={e => setFormData({ ...formData, 'quantity': ensureNumeric(e.target.value) })} value={formData.quantity} />
                    <CFormText className="help-block">Please enter quantity</CFormText>
                    <div class="invalid-feedback">Quantity must be a number with no decimals</div>
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
                    <div class="invalid-feedback">Description must not be blank</div>
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
                    <div class="invalid-feedback">Brand must not be blank</div>
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
                    <div class="invalid-feedback">Category must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="lowInventoryThreshold">Low Inventory Threshold</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="lowInventoryThreshold" id="lowInventoryThreshold" name="lowInventoryThreshold" placeholder="Enter Threshold Value..." autoComplete="lowInventoryThreshold"
                      onChange={e => setFormData({ ...formData, 'lowInventoryThreshold': ensureNumeric(e.target.value) })} value={formData.lowInventoryThreshold} />
                    <CFormText className="help-block">Please enter a threshold value</CFormText>
                    <div class="invalid-feedback">Quantity must be a number with no decimals</div>
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
