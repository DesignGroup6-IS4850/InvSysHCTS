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
import { createJobInventory as createJobInventoryMutation } from '../../graphql/mutations';

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
        const result = await API.graphql({ query: createJobMutation, variables: { input: formData } });
        const jobId = result.data.createJob.id;
        console.log("Added Job: " + jobId);
        addInventoryToJob(jobId);
        showConfirmation("Add Successful", "'" + formData.name + "' was added successfully")
    } catch (e) {
      console.log(e);
    }

    setFormData(initialFormState);
  }

  async function addInventoryToJob(jobId) {
    try {
        await API.graphql({ query: createJobInventoryMutation, variables: { input: { jobInventoryJobId: jobId, jobInventoryInventoryItemId: '16c5d295-76ae-4da0-983a-8b4b56c9662d'}}});
      } catch (e) {
        console.log(e);
      }      
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
