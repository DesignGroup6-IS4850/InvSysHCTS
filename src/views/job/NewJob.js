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
import { createJob as createJobMutation } from '../../graphql/mutations';

import { useHistory } from "react-router-dom";

import { Modal } from '@coreui/coreui';

const initialFormState = { name: '', startDate: '', endDate: '' }

const NewJob = () => {

  const [job, setJob] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  async function createJob() {
    if (!formData.name) return;

    try {
      setJob([...job, formData]);
      var jobData = { name: 'HC Job', startDate: '2021-04-03', endDate: '2021-04-11', inventory: [{id:'69cb79dc-c05f-4772-910c-6390a7dd1a44'}, {id:'92f252d9-8887-4113-9f7e-3482d9e3b397'}]};
      await API.graphql({ query: createJobMutation, variables: { input: jobData } });

      showConfirmation("Add Successful", "'" + formData.name + "' was added successfully")
    } catch (e) {
      console.log(e);
    }

    setFormData(initialFormState);
  }

  function resetForm() {
    setFormData(initialFormState);
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
              New Job
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
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="startDate">Start Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="startDate" id="startDate" name="startDate" placeholder="Enter Start Date..." autoComplete="startDate"
                      onChange={e => setFormData({ ...formData, 'startDate': e.target.value })} value={formData.startDate} />
                    <CFormText className="help-block">Please enter start date</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="endDate">End Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="endDate" id="endDate" name="endDate" placeholder="Enter End Date..." autoComplete="endDate"
                      onChange={e => setFormData({ ...formData, 'endDate': e.target.value })} value={formData.endDate} />
                    <CFormText className="help-block">Please enter end date</CFormText>
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
