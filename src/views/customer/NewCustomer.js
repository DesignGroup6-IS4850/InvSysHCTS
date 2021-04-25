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
import { createCustomer as createCustomerMutation } from '../../graphql/mutations';

import { useHistory } from "react-router-dom";

import { Modal } from '@coreui/coreui';

const initialFormState = { name: '', email: '', phone: '', address: '' }

const NewCustomer = () => {

  const [customer, setCustomer] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  async function createCustomer() {
    if (!validateFormData()) return;

    try {
      setCustomer([...customer, formData]);
      await API.graphql({ query: createCustomerMutation, variables: { input: formData } });

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

  function returnToCustomers() {
    history.push("/customers");  
  }

  function showConfirmation(title, text) {
    var modalElement = document.getElementById('confirmationModal');
    modalElement.addEventListener("hidden.coreui.modal", function () { history.push("/customers"); });
    var confirmationModal = new Modal(modalElement);
    document.getElementById('confirmationModalLabel').innerText = title;
    document.getElementById('confirmationModalText').innerText = text;
    confirmationModal.show();
  }

  function validateFormData() {
    var nameInput = document.getElementById("name");
    var addressInput = document.getElementById("address");
    var phoneInput = document.getElementById("phone");
    var emailInput = document.getElementById("email");

    nameInput.classList.remove("is-invalid");
    nameInput.classList.remove("is-valid");

    addressInput.classList.remove("is-invalid");
    addressInput.classList.remove("is-valid");

    phoneInput.classList.remove("is-invalid");
    phoneInput.classList.remove("is-valid");

    emailInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-valid");

    if (nameInput.value == '') {
      nameInput.classList.add("is-invalid");
      return false;
    } else {
      nameInput.classList.add("is-valid");
    }

    if (addressInput.value == '') {
      addressInput.classList.add("is-invalid");
      return false;
    } else {
      addressInput.classList.add("is-valid");
    }

    if (phoneIsValid(phoneInput.value)) {
      phoneInput.classList.add("is-valid");
    } else {
      phoneInput.classList.add("is-invalid");
      return false;  
    }

    if (emailIsValid(emailInput.value)) {
      emailInput.classList.add("is-valid");
    } else {
      emailInput.classList.add("is-invalid");  
      return false;
    }

    return true;

  }

  function emailIsValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function phoneIsValid(phone)
  {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
  }

  function formatPhone(value) {
    var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    var newValue = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');   
    return newValue;
  }

  function clearValidationMessages() {
    var nameInput = document.getElementById("name");
    var addressInput = document.getElementById("address");
    var phoneInput = document.getElementById("phone");
    var emailInput = document.getElementById("email");

    nameInput.classList.remove("is-invalid");
    nameInput.classList.remove("is-valid");

    addressInput.classList.remove("is-invalid");
    addressInput.classList.remove("is-valid");         

    phoneInput.classList.remove("is-invalid");
    phoneInput.classList.remove("is-valid");   

    emailInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-valid");   

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
              <h5>New Customer</h5>
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
                    <CFormText className="help-block">Please enter customer name</CFormText>
                    <div class="invalid-feedback">Name must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="address">Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="address" id="address" name="address" placeholder="Enter Address..." autoComplete="address"
                      onChange={e => setFormData({ ...formData, 'address': e.target.value })} value={formData.address} />
                    <CFormText className="help-block">Please enter address</CFormText>
                    <div class="invalid-feedback">Address must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone">Phone</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="phone" id="phone" name="phone" placeholder="Enter Phone..." autoComplete="phone"
                      onChange={e => setFormData({ ...formData, 'phone': formatPhone(e.target.value)})} value={formData.phone} />
                    <CFormText className="help-block">Please enter phone number</CFormText>
                    <div class="invalid-feedback">Please enter a valid phone number</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="email" name="email" placeholder="Enter Email..." autoComplete="email"
                      onChange={e => setFormData({ ...formData, 'email': e.target.value })} value={formData.email} />
                    <CFormText className="help-block">Please enter email</CFormText>
                    <div class="invalid-feedback">Please enter a valid email</div>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="cancel" size="sm" color="danger" onClick={returnToCustomers}><CIcon name="cil-ban" /> Cancel</CButton>
              <CButton type="clear" size="sm" color="info" onClick={resetForm}><CIcon name="cil-scrubber" /> Clear</CButton>
              <span class="span-right"><CButton type="submit" size="sm" color="success" onClick={createCustomer}><CIcon name="cil-check-circle" /> Submit</CButton></span>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow>
    </>
  )
}

export default NewCustomer
