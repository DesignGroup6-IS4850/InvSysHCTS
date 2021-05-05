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
import { updateCustomer as updateCustomerMutation, deleteCustomer as deleteCustomerMutation } from '../../graphql/mutations';
import { useHistory } from "react-router-dom";

import { Modal } from '@coreui/coreui'

const Customer = ({ match }) => {

  const [customer, setCustomer] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchCustomer(match.params.id);
  }, []);

  async function fetchCustomer(id) {
    const apiData = await API.graphql({ query: queries.getCustomer, variables: { id: id } });
    console.log("Current version: " + apiData.data.getCustomer._version);
    setCustomer(apiData.data.getCustomer);
  }

  async function updateCustomer() {

    if (!validateFormData()) return;

    try {
      await API.graphql({
        query: updateCustomerMutation, variables: {
          input: {
            id: customer.id,
            name: customer.name,
            address: customer.address,
            phone: customer.phone,
            email: customer.email,
            _version: customer.version
          }
        }
      });
      showConfirmation("Update Successful", "'" + customer.name + "' was updated successfully")
    } catch (e) {
      console.log(e);
    }

  }

  async function deleteCustomer() {

    try {
        await API.graphql({ query: deleteCustomerMutation, variables: { input: { id: customer.id } } });
        showConfirmation("Delete Successful", "'" + customer.name + "' was deleted successfully")
    } catch (e) {
      console.log(e);
    }

  }

  function showConfirmation(title, text) {
    var modalElement = document.getElementById('confirmationModal');
    modalElement.addEventListener("hidden.coreui.modal", function(){  history.push("/customers"); });
    var confirmationModal = new Modal(modalElement);
    document.getElementById('confirmationModalLabel').innerText = title;
    document.getElementById('confirmationModalText').innerText = text;
    confirmationModal.show();
  }

  function returnToCustomers() {
    history.push("/customer");  
  }

  function validateFormData() {

    var errorCount = 0;

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
      // return false;
      errorCount++;
    } else {
      nameInput.classList.add("is-valid");
    }

    if (addressInput.value == '') {
      addressInput.classList.add("is-invalid");
      // return false;
      errorCount++;
    } else {
      addressInput.classList.add("is-valid");
    }

    if (phoneIsValid(phoneInput.value)) {
      phoneInput.classList.add("is-valid");
    } else {
      phoneInput.classList.add("is-invalid");
      // return false;  
      errorCount++;
    }

    if (emailIsValid(emailInput.value)) {
      emailInput.classList.add("is-valid");
    } else {
      emailInput.classList.add("is-invalid");  
      // return false;
      errorCount++;
    }

    return (errorCount == 0);

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
              <h5>Customer</h5>
          </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="name" id="name" name="name" placeholder="Enter Name..." autoComplete="name"
                      onChange={e => setCustomer({ ...customer, 'name': e.target.value })} value={customer.name} />
                    <div class="invalid-feedback">Name must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="address">Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="address" id="address" name="address" placeholder="Enter Address..." autoComplete="address"
                      onChange={e => setCustomer({ ...customer, 'address': e.target.value })} value={customer.address} />
                    <div class="invalid-feedback">Address must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone">Phone</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="phone" id="phone" name="phone" placeholder="Enter Phone..." autoComplete="phone"
                      onChange={e => setCustomer({ ...customer, 'phone': formatPhone(e.target.value) })} value={customer.phone} />
                    <div class="invalid-feedback">Please enter a valid phone number</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="brand">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="email" name="email" placeholder="Enter Email..." autoComplete="email"
                      onChange={e => setCustomer({ ...customer, 'email': e.target.value })} value={customer.email} />
                    <div class="invalid-feedback">Please enter a valid email</div>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="cancel" size="sm" color="danger" onClick={returnToCustomers}><CIcon name="cil-ban" /> Cancel</CButton>
              <CButton type="delete" size="sm" color="warning" onClick={() => deleteCustomer()} ><CIcon name="cil-x-circle" /> Delete</CButton>
              <span class="span-right"><CButton type="update" size="sm" color="primary" onClick={() => updateCustomer()}><CIcon name="cil-check-circle" /> Update</CButton></span>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow>
    </>
  )
}

export default Customer
