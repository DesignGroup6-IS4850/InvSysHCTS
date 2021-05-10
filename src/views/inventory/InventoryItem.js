import React, { useState, useEffect, useContext } from 'react'
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

import {NotificationContext} from '../../notifications/NotificationContext'

import InventoryItemDetailHelpModal from '../help/InventoryItemDetailHelpModal'

const InventoryItem = ({ match }) => {

  const [inventoryItem, setInventoryItem] = useState([]);
  const history = useHistory();
  const [notifications, setNotifications] = useContext(NotificationContext);

  useEffect(() => {
    fetchInventoryItem(match.params.id);
  }, []);

  async function fetchInventoryItem(id) {
    const apiData = await API.graphql({ query: queries.getInventoryItem, variables: { id: id } });
    console.log("Current version: " + apiData.data.getInventoryItem._version);
    setInventoryItem(apiData.data.getInventoryItem);
  }

  async function updateInventoryItem() {

    if (!validateFormData()) return;

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
            lowInventoryThreshold: inventoryItem.lowInventoryThreshold,
            _version: inventoryItem.version
          }
        }
      });

      updateLowStockNotification();

      showConfirmation("Update Successful", "'" + inventoryItem.name + "' was updated successfully")
    } catch (e) {
      console.log(e);
    }

  }

  function updateLowStockNotification() {
    var newNotifications = notifications.map((x) => x);
    var notificationText = "Low Stock - " + inventoryItem.name;

    var currentNotification = newNotifications.find(notification => notification.text == notificationText);

    if (inventoryIsLow()) {
      if (currentNotification == null) {
        newNotifications.push({text: notificationText})
      }
    } else {
      if (currentNotification != null) {
        var index = newNotifications.indexOf(currentNotification);
        newNotifications.splice(index, 1);
      }
    }
    setNotifications(newNotifications)
  }

  function inventoryIsLow() {
    return ((inventoryItem.lowInventoryThreshold !=null) && (inventoryItem.quantity <= inventoryItem.lowInventoryThreshold))
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
              <h5>Inventory Item<span class="span-right"><InventoryItemDetailHelpModal/></span></h5>
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
                  <div class="invalid-feedback">Name must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="quantity">Quantity</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="quantity" id="quantity" name="quantity" placeholder="Enter Quantity..." autoComplete="quantity"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'quantity': ensureNumeric(e.target.value) })} value={inventoryItem.quantity} />
                  <div class="invalid-feedback">Quantity must be a number with no decimals</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="description">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="description" id="description" name="description" placeholder="Enter Description..." autoComplete="description"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'description': e.target.value })} value={inventoryItem.description} />
                  <div class="invalid-feedback">Description must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="brand">Brand</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="brand" id="brand" name="brand" placeholder="Enter Brand..." autoComplete="brand"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'brand': e.target.value })} value={inventoryItem.brand} />
                  <div class="invalid-feedback">Brand must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="brand">Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="category" id="category" name="category" placeholder="Enter Category..." autoComplete="category"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'category': e.target.value })} value={inventoryItem.category} />
                  <div class="invalid-feedback">Category must not be blank</div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="lowInventoryThreshold">Low Inventory Threshold</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="lowInventoryThreshold" id="lowInventoryThreshold" name="lowInventoryThreshold" placeholder="Enter Threshold Value..." autoComplete="lowInventoryThreshold"
                      onChange={e => setInventoryItem({ ...inventoryItem, 'lowInventoryThreshold': ensureNumeric(e.target.value) })} value={inventoryItem.lowInventoryThreshold} />
                  <div class="invalid-feedback">Quantity must be a number with no decimals</div>
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
