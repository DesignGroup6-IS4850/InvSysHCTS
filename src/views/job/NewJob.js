import React, { useState, useEffect, useCallback } from 'react';
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
  CRow,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { API } from 'aws-amplify';
import { createJob as createJobMutation} from '../../graphql/mutations';
import { listCustomers } from '../../graphql/queries';
import { useHistory } from "react-router-dom";

import { Modal } from '@coreui/coreui';

const initialFormState = { name: '', startDate: '', endDate: '', completed: false}

const NewJob = () => {

  const [job, setJob] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

   const fetchCustomers = useCallback(async() => {
      const apiData = await API.graphql({ query: listCustomers });
      loadCustomerOptions(apiData.data.listCustomers.items);
   }, []);

   useEffect(() => {
     fetchCustomers();
   }, [fetchCustomers]);

  function loadCustomerOptions(customerList) {
    var optionHtml = "<option disabled selected value> -- select a customer -- </option>";
    customerList.map(customer => {
      optionHtml = optionHtml + "<option value='" + customer.id + "'>" + customer.name + "</option>";  
    });
    var customerDropdown = document.getElementById('customer');
    customerDropdown.innerHTML = optionHtml;  
    setCustomers(customerList); 
  }

  async function createJob() {
    if (!validateFormData()) return;

    try {

        var customerId = document.getElementById("customer").value;
        var customer = customers.find(item => item.id == customerId);
        console.log ("Found customer: " + customer.name);

        setJob([...job, formData]);
        const result = await API.graphql({ query: createJobMutation, variables: { input: formData } });  
                      
        const jobId = result.data.createJob.id;

        console.log("Added Job: " + jobId);
        showConfirmation("Add Successful", "'" + formData.name + "' was added successfully")
    } catch (e) {
      console.log(e);
    }

    setFormData(initialFormState);
  }

  function resetForm() {
    setFormData(initialFormState);
    loadCustomerOptions(customers);
  }

  function returnToJobs() {
    history.push("/jobs");  
  }

  function showConfirmation(title, text) {
    var modalElement = document.getElementById('confirmationModal');
    modalElement.addEventListener("hidden.coreui.modal", function () { history.push("/jobs"); });
    var confirmationModal = new Modal(modalElement);
    document.getElementById('confirmationModalLabel').innerText = title;
    document.getElementById('confirmationModalText').innerText = text;
    confirmationModal.show();
  }

  function validateFormData() {
    var nameInput = document.getElementById("name");
    var customerInput = document.getElementById("customer");
    var startDateInput = document.getElementById("startDate");
    var endDateInput = document.getElementById("endDate");
    var endDateErrorMsg = document.getElementById("endDateErrorMsg");

    nameInput.classList.remove("is-invalid");
    nameInput.classList.remove("is-valid");

    customerInput.classList.remove("is-invalid");
    customerInput.classList.remove("is-valid");

    startDateInput.classList.remove("is-invalid");
    startDateInput.classList.remove("is-valid");

    endDateInput.classList.remove("is-invalid");
    endDateInput.classList.remove("is-valid");

    if (nameInput.value == '') {
      nameInput.classList.add("is-invalid");
      return false;
    } else {
      nameInput.classList.add("is-valid");
    }

    if (customerInput.value == '') {
      customerInput.classList.add("is-invalid");
      return false;
    } else {
      customerInput.classList.add("is-valid");
    }

    if (dateIsValid(startDateInput.value)) {
      startDateInput.classList.add("is-valid");
    } else {
      startDateInput.classList.add("is-invalid");
      return false;  
    }

    if (dateIsValid(endDateInput.value)) {
      endDateInput.classList.add("is-valid");
    } else {
      endDateErrorMsg.innerHTML = "Must be a valid date"
      endDateInput.classList.add("is-invalid");  
      return false;
    }

    if (endDateAfterStartDate(startDateInput.value, endDateInput.value)) {
      endDateInput.classList.add("is-valid");
    } else {
      endDateErrorMsg.innerHTML = "End date must occur after start date"
      endDateInput.classList.add("is-invalid");  
      return false;
    }

    return true;

  }

  function endDateAfterStartDate(startDate, endDate) {
    return (Date.parse(startDate) <= Date.parse(endDate));
  }

  function dateIsValid(dateString)
  {
      // First check for the pattern (yyyy-mm-dd)
      if(!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
          return false;
      }
  
      // Parse the date parts to integers
      var parts = dateString.split("-");
      var year = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var day = parseInt(parts[2], 10);
  
      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;
  
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  
      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;
  
      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
  };

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
              <h5>New Job</h5>
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
                    <CFormText className="help-block">Please enter job name</CFormText>
                    <div class="invalid-feedback">Name must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="customer">Customer</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect type="customer" id="customer" name="customer" placeholder="Enter Customer..." autoComplete="customer"
                      onChange={e => setFormData({ ...formData, 'jobCustomerId': e.target.value })} value={formData.jobCustomerId} />
                    <CFormText className="help-block">Please select customer</CFormText>
                    <div class="invalid-feedback">Customer must be selected</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="startDate">Start Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="startDate" name="startDate" placeholder="Enter Start Date..." autoComplete="startDate"
                      onChange={e => setFormData({ ...formData, 'startDate': e.target.value })} value={formData.startDate} />
                    <CFormText className="help-block">Please enter start date</CFormText>
                    <div class="invalid-feedback">Must be a valid date</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="endDate">End Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="endDate" name="endDate" placeholder="Enter End Date..." autoComplete="endDate"
                      onChange={e => setFormData({ ...formData, 'endDate': e.target.value })} value={formData.endDate} />
                    <CFormText className="help-block">Please enter end date</CFormText>
                    <div id="endDateErrorMsg" class="invalid-feedback">Must be a valid date</div>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="cancel" size="sm" color="danger" onClick={returnToJobs}><CIcon name="cil-ban" /> Cancel</CButton>
              <CButton type="clear" size="sm" color="info" onClick={resetForm}><CIcon name="cil-scrubber" /> Clear</CButton>
              <span class="span-right"><CButton type="submit" size="sm" color="success" onClick={createJob}><CIcon name="cil-check-circle" /> Submit</CButton></span>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow>
    </>
  )
}

export default NewJob
