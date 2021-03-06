import React, { useState, useEffect, useCallback } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CCardFooter,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CSelect,
    CDataTable,
    CTextarea
} from '@coreui/react'

import { API, graphqlOperation } from 'aws-amplify';
import { listCustomers } from '../../graphql/queries';
import { updateJob as updateJobMutation, deleteJob as deleteJobMutation } from '../../graphql/mutations';
import {
    updateJobInventory as updateJobInventoryMutation,
    createJobInventory as createJobInventoryMutation,
    deleteJobInventory as deleteJobInventoryMutation,
    createInvoice as createInvoiceMutation,
    createInvoiceItem as createInvoiceItemMutation,
    createLaborItem as createLaborItemMutation,
    updateLaborItem as updateLaborItemMutation,
    deleteLaborItem as deleteLaborItemMutation,
    updateInventoryItem as updateInventoryItemMutation
} from '../../graphql/mutations';
import { useHistory, useLocation } from "react-router-dom";
import { listInventoryItems } from '../../graphql/queries';
import { listJobInventorys } from '../../graphql/queries';

import { Modal } from '@coreui/coreui';

import InvoiceHelpModal from '../help/InvoiceHelpModal'
import JobDetailHelpModal from '../help/JobDetailHelpModal'
import JobMaterialListHelpModal from '../help/JobMaterialListHelpModal'
import LaborHelpModal from '../help/LaborHelpModal'

const Job = ({ match }) => {

    const [job, setJob] = useState([]);
    const [materialList, setMaterialList] = useState([]);
    const [laborList, setLaborList] = useState([]);
    const [currentMaterialItem, setCurrentMaterialItem] = useState(null);
    const [currentLaborItem, setCurrentLaborItem] = useState(null);
    const [newMaterialQuantity, setNewMaterialQuantity] = useState('');
    const [newMaterialPrice, setNewMaterialPrice] = useState('');
    const [inventoryItems, setInventoryItems] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [notes, setNotes] = useState(null);
    const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
    const [showEditMaterialModal, setShowEditMaterialModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showLaborModal, setShowLaborModal] = useState(false);
    const [jobCompleted, setJobCompleted] = useState(false);
    const [reservedInventory, setReservedInventory] = useState(null);
    const [availableInventory, setAvailableInventory] = useState([]);

    const materialFields = [
        { key: 'name', _style: { width: '40%' } },
        'quantity', 'price',
        { key: 'brand', _style: { width: '20%' } },
        { key: 'category', _style: { width: '20%' } },
        {
            key: 'edit',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'remove',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }

    ]

    const laborFields = [
        { key: 'description', _style: { width: '40%' } },
        'quantity', 'rate',
        {
            key: 'edit',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'remove',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }

    ]

    const invoiceFields = [
        { key: 'number', _style: { width: '50%' } },
        { key: 'transDate', _style: { width: '50%' } }
    ]

    const addMaterialFields = [
        { key: 'name', label:'Available Inventory', _style: { width: '100%' }  }
    ]

    const toggleAddMaterialModal = () => {
        setShowAddMaterialModal(!showAddMaterialModal);
    }

    const toggleRemoveModal = () => {
        setShowRemoveModal(!showRemoveModal);
    }

    const toggleEditMaterialModal = () => {
        setShowEditMaterialModal(!showEditMaterialModal);
    }

    const toggleLaborModal = () => {
        setShowLaborModal(!showLaborModal);
    }

    const history = useHistory();

    const tableFilterProps = {placeholder: ' '}

    useEffect(() => {
        fetchJob(match.params.id);
    }, []);

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        fetchJobInventorys();
    }, []);

    const fetchCustomers = useCallback(async() => {
        const apiData = await API.graphql({ query: listCustomers });
        loadCustomerOptions(apiData.data.listCustomers.items);
     }, []);

    async function fetchInventoryItems() {
        var apiData = await API.graphql({ query: listInventoryItems });

        var retrievedInventoryItems = apiData.data.listInventoryItems.items;

        var itemsNextToken = apiData.data.listInventoryItems.nextToken
        while ( itemsNextToken != null) {
            apiData = await API.graphql({ query: listInventoryItems, 
                                        variables: {
                                        nextToken: itemsNextToken
            } 
            });

            itemsNextToken = apiData.data.listInventoryItems.nextToken
            retrievedInventoryItems = retrievedInventoryItems.concat(apiData.data.listInventoryItems.items)
        }

        setInventoryItems(retrievedInventoryItems);
    }

    async function fetchJobInventorys() {
        const apiData = await API.graphql({ query: listJobInventorys });
        createReservedInventory(apiData.data.listJobInventorys.items);  
    }

    function createReservedInventory(jobMaterials) {
        var reservedInventoryMap = new Map();
        jobMaterials.map(material => {
            if ((material.job != null) && (material.inventoryItem != null) && (material.jobQuantity != null)) {
                if ((material.job.id != job.id) && (!material.job.completed)) {
                    var currentReservedQuantity = 0;
                    if (reservedInventoryMap.has(material.inventoryItem.id)) {
                        currentReservedQuantity = reservedInventoryMap.get(material.inventoryItem.id) + material.jobQuantity
                    } else {
                        currentReservedQuantity = material.jobQuantity
                    }       
                    reservedInventoryMap.set(material.inventoryItem.id, currentReservedQuantity)            
                }
            }
        })    

        reservedInventoryMap.forEach(function(value, key) {
            console.log(key + ' = ' + value)
        })

        setReservedInventory(reservedInventoryMap)


    }

    async function fetchJob(id) {
        console.log("entered job");
        // const apiData = await API.graphql({ query: queries.getJobWithInventory, variables: { id: id } });
        const apiData = await API.graphql(graphqlOperation(` 
        query GetJob($id: ID!) {
            getJob(id: $id) {
              id
              name
              startDate
              endDate
              completed
              notes
              customer {
                address
                email
                id
                name
                phone
              }
              invoices {
                items {
                  number
                  transDate
                  id
                  dueDate
                }
              }
              laborItems {
                items {
                  description
                  id
                  quantity
                  rate
                }
              }
              inventory {
                items {
                  id
                  jobQuantity
                  jobPrice
                  createdAt
                  updatedAt
                  inventoryItem {
                    id
                    name
                    brand
                    description
                    category
                    quantity
                  }
                }
                nextToken
              }
              _version
              createdAt
              updatedAt
            }
          }
      `, { id: id }));

        setJob(apiData.data.getJob);

        setJobCustomer(apiData.data.getJob.customer);

        setJobNotes(apiData.data.getJob.notes);

        var materialListArray = new Array();
        if (apiData.data.getJob.inventory.items != null) {
            apiData.data.getJob.inventory.items.map(item => {
                if ((item != null) && (item.inventoryItem != null)) {
                    materialListArray.push(
                        {
                            id: item.id, name: item.inventoryItem.name,
                            quantity: item.jobQuantity, price: item.jobPrice, 
                            brand: item.inventoryItem.brand,
                            category: item.inventoryItem.category,
                            inventoryId: item.inventoryItem.id
                        })
                }
            });
        }

        setMaterialList(materialListArray);

        if (apiData.data.getJob.invoices.items != null){
            setInvoices(apiData.data.getJob.invoices.items);
        }

        if (apiData.data.getJob.laborItems.items != null){
            setLaborList(apiData.data.getJob.laborItems.items);
        }

        setJobCompleted(apiData.data.getJob.completed);


        console.log("Job Completed: " + apiData.data.getJob.completed)

        if (apiData.data.getJob.completed) {
            setPageAsCompleted();
        }

    }

    function setPageAsCompleted() {
        document.getElementById("completeJobButton").hidden = true;
        document.getElementById("jobCompletedBanner").hidden = false;
        document.getElementById("name").disabled = true;
        document.getElementById("customer").disabled = true;
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        document.getElementById("jobDetailFooter").hidden = true;
        document.getElementById("generateInvoiceRow").hidden = true;
        document.getElementById("addMaterialsRow").hidden = true;
        document.getElementById("addLaborRow").hidden = true;
    }

    function loadCustomerOptions(customerList) {
        var optionHtml = "<option disabled selected value> -- select a customer -- </option>";
        customerList.map(customer => {
        optionHtml = optionHtml + "<option value='" + customer.id + "'>" + customer.name + "</option>";  
        });
        var customerDropdown = document.getElementById('customer');
        customerDropdown.innerHTML = optionHtml;  
        setCustomers(customerList); 
    }

    function setJobNotes(jobNotes) {
        if (jobNotes != null) {
            var notesTextArea = document.getElementById('notesTextArea');
            notesTextArea.value = jobNotes;
        }
        hideNotesSaveButton();
    }

    function setJobCustomer(jobCustomer) {
        if (jobCustomer != null) {
            var customerDropdown = document.getElementById('customer');
            customerDropdown.value = jobCustomer.id;
            setCustomer(jobCustomer);
            console.log("Customer Variable: " + customer);
        }
    }

    async function updateJob() {
        
        if (!validateJobData()) return;

        try {
            await API.graphql({
                query: updateJobMutation, variables: {
                    input: {
                        id: job.id,
                        name: job.name,
                        startDate: job.startDate,
                        endDate: job.endDate,
                        jobCustomerId: job.jobCustomerId,
                        _version: job.version
                    }
                }
            });
            showConfirmation("Update Successful", "'" + job.name + "' was updated successfully")
        } catch (e) {
            console.log(e);
        }

    }

    async function updateMaterialItem() {

        currentMaterialItem.quantity = newMaterialQuantity;
        currentMaterialItem.price = newMaterialPrice;
        console.log("Item: " + currentMaterialItem.name + ", id: " + currentMaterialItem.id + ", quantity: " + currentMaterialItem.quantity);
        try {
            await API.graphql({
                query: updateJobInventoryMutation, variables: {
                    input: {
                        id: currentMaterialItem.id,
                        jobQuantity: parseInt(newMaterialQuantity, 10),
                        jobPrice: parseFloat(newMaterialPrice)
                    }
                }
            });
            newMaterialQuantity = '';
            newMaterialPrice = '';
            showConfirmation("Update Successful", "'" + currentMaterialItem.name + "' was updated successfully")
            window.location.reload();
        } catch (e) {
            console.log(e);
        }

    }

    async function addMaterialItem(jobId, inventoryId, quantity, price) {

        try {
            var apiData = await API.graphql({
                query: createJobInventoryMutation, variables: {
                    input: {
                        jobInventoryJobId: jobId,
                        jobInventoryInventoryItemId: inventoryId,
                        jobQuantity: quantity, jobPrice: price
                    }
                }
            });
            var inventoryItem = inventoryItems.find(item => item.id == inventoryId);
            showConfirmation("Add Successful", "'" + inventoryItem.name + "' was added successfully")

            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    }

    async function removeMaterialItem() {

        console.log("Item: " + currentMaterialItem.name + ", id: " + currentMaterialItem.id + ", quantity: " + currentMaterialItem.quantity);
        try {
            await API.graphql({
                query: deleteJobInventoryMutation, variables: {
                    input: {
                        id: currentMaterialItem.id
                    }
                }
            });
            showConfirmation("Remove Successful", "'" + currentMaterialItem.name + "' was removed successfully");

            window.location.reload();

        } catch (e) {
            console.log(e);
        }

    }

    async function deleteJob() {

        try {
            await API.graphql({ query: deleteJobMutation, variables: { input: { id: job.id } } });
            showConfirmationAndLeave("Delete Successful", "'" + job.name + "' was deleted successfully")
        } catch (e) {
            console.log(e);
        }

    }

    async function addLaborItem(description, quantity, rate) {

        try {
            console.log ("Adding labor: job: " + job.id + ", description: " + description + ", quantity: " + quantity + ', rate: ' + rate);
            var apiData = await API.graphql({
                query: createLaborItemMutation, variables: {
                    input: {
                        laborItemJobId: job.id,
                        description: description,
                        quantity: quantity, rate: rate
                    }
                }
            });
            showConfirmation("Add Successful", "'" + description + "' was added successfully")

            window.location.reload();

        } catch (e) {
            console.log(e);
        }

    }

    async function updateLaborItem(id, description, quantity, rate) {
        try {
            console.log ("Updating labor: item: " + id + ", description: " + description + ", quantity: " + quantity + ', rate: ' + rate);
            var apiData = await API.graphql({
                query: updateLaborItemMutation, variables: {
                    input: {
                        id: id,
                        description: description,
                        quantity: quantity, rate: rate
                    }
                }
            });
            showConfirmation("Update Successful", "'" + description + "' was updated successfully")

            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    }

    async function removeLaborItem() {

      try {
            await API.graphql({
                query: deleteLaborItemMutation, variables: {
                    input: {
                        id: currentLaborItem.id
                    }
                }
            });
            showConfirmation("Remove Successful", "'" + currentLaborItem.description + "' was removed successfully");

            window.location.reload();

        } catch (e) {
            console.log(e);
        }

    }

    async function generateInvoice() {

        try {
            var today = new Date();
            
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(today);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(today);
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(today);

            var date = `${mo}-${da}-${ye}`;

            var nextInvoiceNumber = `${ye}${mo}` + "-" + ('0' + (invoices.length + 1)).slice(-2);

            var apiData = await API.graphql({
                query: createInvoiceMutation, variables: {
                    input: {
                        number: nextInvoiceNumber,
                        transDate: date,
                        dueDate: date,
                        invoiceJobId: job.id
                    }
                }
            });
            var invoiceNumber = apiData.data.createInvoice.number;
            var invoiceId = apiData.data.createInvoice.id;


            var invoiceItemList = [];
            materialList.map(item => {
                invoiceItemList.push({
                    description: item.name, 
                    quantity: item.quantity,
                    rate: item.price});
            });
            laborList.map(item => {
                invoiceItemList.push({
                    description: item.description, 
                    quantity: item.quantity,
                    rate: item.rate});
            });

            console.log("Invoice ID: " + invoiceId);
            invoiceItemList.map(item => {
                console.log("Invoice Item: " + item.description);
                apiData = API.graphql({
                    query: createInvoiceItemMutation, variables: {
                        input: {
                            description: item.description,
                            quantity: item.quantity,
                            rate: item.rate,
                            invoiceItemInvoiceId: invoiceId
                        }
                    }
                });
            });

            history.push(`/invoice/${invoiceId}`);

        } catch (e) {
            console.log(e);
        }
    }

    async function saveNotes() {

        var notesText = document.getElementById('notesTextArea').value;

        try {
                var apiData =  await API.graphql({
                    query: updateJobMutation, variables: {
                        input: {
                            id: job.id,
                            notes: notesText
                        }
                    }
                });

            hideNotesSaveButton();

        } catch (e) {
            console.log(e);
        }

    }

    function hideNotesSaveButton() {
        document.getElementById('notesSaveButtonDiv').style.display = 'none';
    }

    function showNotesSaveButton() {
        document.getElementById('notesSaveButtonDiv').style.display = 'block';     
    }

    function showConfirmation(title, text) {
        var modalElement = document.getElementById('confirmationModal');
        var confirmationModal = new Modal(modalElement);
        document.getElementById('confirmationModalLabel').innerText = title;
        document.getElementById('confirmationModalText').innerText = text;
        confirmationModal.show();
    }

    function showConfirmationAndLeave(title, text) {
        var modalElement = document.getElementById('confirmationModal');
        modalElement.addEventListener("hidden.coreui.modal", function () { history.push("/jobs"); });
        var confirmationModal = new Modal(modalElement);
        document.getElementById('confirmationModalLabel').innerText = title;
        document.getElementById('confirmationModalText').innerText = text;
        confirmationModal.show();
    }

    function launchAddMaterialModal() {
        var availableInventoryList = new Array();
        for (const inventoryItem of inventoryItems) {
            if((materialList.find(item => item.inventoryId == inventoryItem.id) == null)){
                availableInventoryList.push({id: inventoryItem.id, name: inventoryItem.name});
            }
        }
        setAvailableInventory(availableInventoryList);
        document.getElementById('addMaterialNameInput').value = "";
        document.getElementById('addMaterialQuantityInput').value = "";
        document.getElementById('addMaterialPriceInput').value = "";
        clearAddMaterialValidationMessages();
        toggleAddMaterialModal();
    }

    function launchEditMaterialModal(item) {
        setCurrentMaterialItem(item);
        setNewMaterialQuantity(item.quantity);
        setNewMaterialPrice(item.price);
        document.getElementById('editMaterialModalTitle').innerHTML = "Edit " + item.name + "?";
        document.getElementById('itemNameText').innerHTML = item.name;
        document.getElementById('itemInventoryId').value = item.inventoryId;
        clearEditMaterialValidationMessages();
        toggleEditMaterialModal();
    }

    function launchRemoveMaterialModal(item) {
        setCurrentMaterialItem(item);
        document.getElementById('itemType').value = "material";
        document.getElementById('removeModalTitle').innerHTML = "Remove " + item.name + "?";
        document.getElementById('removeModalText').innerHTML = "Are you sure you wish to remove " + item.name + "?";
        toggleRemoveModal();
    }

    function cancelRemoveModal() {
        toggleRemoveModal();
    }

    function okRemoveModal() {
        var itemType = document.getElementById('itemType').value;
        if (itemType == "material") {
            removeMaterialItem();
        } else if (itemType == "labor") {
            removeLaborItem();
        }
        toggleRemoveModal();
    }

    function cancelAddMaterialModal() {
        toggleAddMaterialModal();
    }

    function okAddMaterialModal() {
        var addMaterialNameInput = document.getElementById("addMaterialNameInput");
        var addMaterialIdInput = document.getElementById("addMaterialIdInput");
        var addMaterialQuantityInput = document.getElementById("addMaterialQuantityInput");
        var addMaterialPriceInput = document.getElementById("addMaterialPriceInput");

        if (!validateAddMaterial()) return;

        addMaterialItem(job.id, addMaterialIdInput.value, 
            parseInt(addMaterialQuantityInput.value, 10), parseFloat(addMaterialPriceInput.value));
        toggleAddMaterialModal();
    }

    function cancelEditMaterialModal() {
        toggleEditMaterialModal();
    }

    function okEditMaterialModal() {
        if (!validateEditMaterial()) return;
        updateMaterialItem();
        toggleEditMaterialModal();
    }

    function launchAddLaborModal() {
        document.getElementById("laborItemId").value = null;
        document.getElementById("laborDescriptionInput").value = null;
        document.getElementById("laborQuantityInput").value = null;
        document.getElementById("laborRateInput").value = null;
        clearLaborValidationMessages();
        toggleLaborModal();
    }

    function launchEditLaborModal(item) {
        document.getElementById("laborItemId").value = item.id;
        document.getElementById("laborDescriptionInput").value = item.description;
        document.getElementById("laborQuantityInput").value = item.quantity;
        document.getElementById("laborRateInput").value = item.rate;
        clearLaborValidationMessages();
        toggleLaborModal();
    }

    function launchRemoveLaborModal(item) {
        setCurrentLaborItem(item);
        document.getElementById('itemType').value = "labor";
        document.getElementById('removeModalTitle').innerHTML = "Remove " + item.description + "?";
        document.getElementById('removeModalText').innerHTML = "Are you sure you wish to remove " + item.description + "?";
        toggleRemoveModal();
    }

    function okAddLabor() {
        if (!validateLabor()) return;
        var laborItemId = document.getElementById("laborItemId").value;
        var laborDescription = document.getElementById("laborDescriptionInput").value;
        var laborQuantity = parseFloat(document.getElementById("laborQuantityInput").value);
        var laborRate = parseFloat(document.getElementById("laborRateInput").value);
        if (laborItemId == '') {
            addLaborItem(laborDescription, laborQuantity, laborRate);
        } else {
            updateLaborItem(laborItemId, laborDescription, laborQuantity, laborRate);
        }
        toggleLaborModal();
    }

    function cancelAddLabor() {
        toggleLaborModal();
    }

    function returnToJobs() {
        history.push("/jobs");
    }

    async function completeJob() {
        updateInventoryQuantities();
        try {
            await API.graphql({
                query: updateJobMutation, variables: {
                    input: {
                        id: job.id,
                        completed: true,
                        _version: job.version
                    }
                }
            });
            showConfirmation("Job Completed", "'" + job.name + "' was completed successfully")
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    function updateInventoryQuantities() {
        try {
            for (const materialItem of materialList) {
                var inventoryItem = inventoryItems.find(item => item.id == materialItem.inventoryId);
                var newInventoryQuantity = inventoryItem.quantity - materialItem.quantity;
                var result = API.graphql({
                    query: updateInventoryItemMutation, variables: {
                    input: {
                        id: inventoryItem.id,
                        quantity: newInventoryQuantity,
                        _version: inventoryItem.version
                    }
                    }
                });
            }       
        } catch(e) {
            console.log(e);
        }
    }

    function validateJobData() {

        var errorCount = 0;

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
        //   return false;
          errorCount++;
        } else {
          nameInput.classList.add("is-valid");
        }
    
        if (customerInput.value == '') {
          customerInput.classList.add("is-invalid");
        //   return false;
          errorCount++;
        } else {
          customerInput.classList.add("is-valid");
        }
    
        if (dateIsValid(startDateInput.value)) {
          startDateInput.classList.add("is-valid");
        } else {
          startDateInput.classList.add("is-invalid");
        //   return false;
          errorCount++;  
        }
    
        if (dateIsValid(endDateInput.value)) {
          endDateInput.classList.add("is-valid");
        } else {
          endDateErrorMsg.innerHTML = "Must be a valid date"
          endDateInput.classList.add("is-invalid");  
        //   return false;
          errorCount++;
        }
    
        if (endDateAfterStartDate(startDateInput.value, endDateInput.value)) {
            endDateInput.classList.add("is-valid");
          } else {
            endDateErrorMsg.innerHTML = "End date must occur after start date"
            endDateInput.classList.add("is-invalid");  
            // return false;
            errorCount++;
        }

        return (errorCount == 0);
    
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

      function clearAddMaterialValidationMessages() {
        var inventoryInput = document.getElementById("addMaterialNameInput");
        var quantityInput = document.getElementById("addMaterialQuantityInput");
        var priceInput = document.getElementById("addMaterialPriceInput");
    
        inventoryInput.classList.remove("is-invalid");
        inventoryInput.classList.remove("is-valid");
    
        quantityInput.classList.remove("is-invalid");
        quantityInput.classList.remove("is-valid");
    
        priceInput.classList.remove("is-invalid");
        priceInput.classList.remove("is-valid");         
      }

      function clearEditMaterialValidationMessages() {
        var quantityInput = document.getElementById("quantityText");
        var priceInput = document.getElementById("priceText");
    
        quantityInput.classList.remove("is-invalid");
        quantityInput.classList.remove("is-valid");
    
        priceInput.classList.remove("is-invalid");
        priceInput.classList.remove("is-valid");         
      }

      function clearLaborValidationMessages() {
        var descriptionInput = document.getElementById("laborDescriptionInput");
        var quantityInput = document.getElementById("laborQuantityInput");
        var rateInput = document.getElementById("laborRateInput");
    
        descriptionInput.classList.remove("is-invalid");
        descriptionInput.classList.remove("is-valid");

        quantityInput.classList.remove("is-invalid");
        quantityInput.classList.remove("is-valid");
    
        rateInput.classList.remove("is-invalid");
        rateInput.classList.remove("is-valid");         
      }

      function validateAddMaterial() {

        var errorCount = 0;

        var inventoryNameInput = document.getElementById("addMaterialNameInput");
        var inventoryIdInput = document.getElementById("addMaterialIdInput");
        var quantityInput = document.getElementById("addMaterialQuantityInput");
        var priceInput = document.getElementById("addMaterialPriceInput");
        var quantityErrorMsg = document.getElementById("addMaterialQuantityError");
    
        clearAddMaterialValidationMessages();
    
        if (inventoryNameInput.value == '') {
            inventoryNameInput.classList.add("is-invalid");
            // return false;
            errorCount++;
        } else {
            inventoryNameInput.classList.add("is-valid");
        }

        if (quantityIsValid(quantityInput.value, quantityErrorMsg, inventoryIdInput.value)) {
            quantityInput.classList.add("is-valid");
        } else {
            quantityInput.classList.add("is-invalid");  
            // return false;
            errorCount++;
        }
    
        if (priceIsValid(priceInput.value)) {
            priceInput.classList.add("is-valid");
        } else {
            priceInput.classList.add("is-invalid");  
            // return false;
            errorCount++;
        }

        return (errorCount == 0);          
      }

      function validateEditMaterial() {

        var errorCount = 0;

        var quantityInput = document.getElementById("quantityText");
        var priceInput = document.getElementById("priceText");
        var quantityErrorMsg = document.getElementById("editMaterialQuantityError");
        var inventoryItemField = document.getElementById("itemInventoryId");
    
        clearEditMaterialValidationMessages();

        if (quantityIsValid(quantityInput.value, quantityErrorMsg, inventoryItemField.value)) {
            quantityInput.classList.add("is-valid");
        } else {
            quantityInput.classList.add("is-invalid");  
            // return false;
            errorCount++;
        }
    
        if (priceIsValid(priceInput.value)) {
            priceInput.classList.add("is-valid");
        } else {
            priceInput.classList.add("is-invalid");  
            // return false;
            errorCount++;
        }

        return (errorCount == 0);          
      }

      function quantityIsValid(quantity, quantityErrorMsg, inventoryId) {
        if ((quantity != '') && (Number.isInteger(Number(quantity)))) {
            var inventoryItem = inventoryItems.find(item => item.id == inventoryId);
            if (inventoryItem != null) {

                var currentReservedQuantity = 0;
                if (reservedInventory.has(inventoryItem.id)) {
                    currentReservedQuantity = reservedInventory.get(inventoryItem.id)
                }

                if (quantity > inventoryItem.quantity - currentReservedQuantity) {
                    quantityErrorMsg.innerHTML = "Entered quantity exceeds current inventory plus amounts reserved to other open jobs";
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            quantityErrorMsg.innerHTML = "Quantity must be a number with no decimals";
            return false;
        }
      }

      function priceIsValid(price) {
        return ((price != '') && (!isNaN(Number(price))));    
      }


      function validateLabor() {

        var errorCount = 0;

        var descriptionInput = document.getElementById("laborDescriptionInput");
        var quantityInput = document.getElementById("laborQuantityInput");
        var rateInput = document.getElementById("laborRateInput");
    
        clearLaborValidationMessages();
    
        if (descriptionInput.value == '') {
            descriptionInput.classList.add("is-invalid");
            // return false;
            errorCount++;
        } else {
            descriptionInput.classList.add("is-valid");
        }

        if ((quantityInput.value != '') && (Number.isInteger(Number(quantityInput.value)))){
            quantityInput.classList.add("is-valid");
        } else {
            quantityInput.classList.add("is-invalid");  
            // return false;
            errorCount++;
        }
    
        if ((rateInput.value != '') && (!isNaN(Number(rateInput.value)))) {
            rateInput.classList.add("is-valid");
        } else {
            rateInput.classList.add("is-invalid");  
            // return false;
            errorCount++;
        }

        return (errorCount == 0);
    }

    function setAddMaterialInput(item) {
        document.getElementById("addMaterialNameInput").value = item.name;
        document.getElementById("addMaterialIdInput").value = item.id;
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

            <CModal
                id="removeModal"
                show={showRemoveModal}
                onClose={toggleRemoveModal}
            >
                <CModalHeader id="removeModalTitle"></CModalHeader>
                <CModalBody>
                    <div className="modal-body">
                        <input type="hidden" id="itemType" name="itemType"/>
                        <label id="removeModalText"></label>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton id="okRemoveButton" color="success" onClick={okRemoveModal}>OK</CButton>{' '}
                    <CButton id="cancelRemoveButton" color="secondary" onClick={cancelRemoveModal}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                id="addMaterialModal"
                show={showAddMaterialModal}
                onClose={toggleAddMaterialModal} 
                size="xl"
            >
                <CModalHeader id="addMaterialModalTitle"></CModalHeader>
                <CModalBody>
                    <CForm action="" className="form-horizontal">
                        <CRow>
                        <CCol>
                            <CDataTable
                                fields={addMaterialFields}
                                items={availableInventory}
                                tableFilter={tableFilterProps}
                                footer
                                itemsPerPage={5}
                                hover
                                sorter
                                pagination
                                onRowClick={(item) => setAddMaterialInput(item)}
                            />     
                        </CCol>
                        <CCol>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="addMaterialNameInput">Inventory Item</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput readonly="true" id="addMaterialNameInput" name="addMaterialNameInput" type="text" placeholder="Select Inventory Item..." />
                                    <hidden id="addMaterialIdInput"/>
                                    <div class="invalid-feedback">Inventory item must be selected</div>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="addMaterialQuantityInput">Quantity</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="addMaterialQuantityInput" name="addMaterialQuantityInput" type="number" placeholder="Enter Quantity..." />
                                    <div id="addMaterialQuantityError" class="invalid-feedback"></div>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="addMaterialPriceInput">Price</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput id="addMaterialPriceInput" name="addMaterialPriceInput" type="number" placeholder="Enter Price..." />
                                    <div class="invalid-feedback">Please enter a valid price</div>
                                </CCol>
                            </CFormGroup>
                        </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={okAddMaterialModal}>OK</CButton>{' '}
                    <CButton color="secondary" onClick={cancelAddMaterialModal}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                id="editMaterialModal"
                show={showEditMaterialModal}
                onClose={toggleEditMaterialModal}
            >
                <CModalHeader id="editMaterialModalTitle"></CModalHeader>
                <CModalBody>
                    <CForm action="" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="itemNameText">Item</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CLabel id="itemNameText" name="itemNameText" />
                                <input type="hidden" id="itemInventoryId" name="itemInventoryId"/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="quantityText">Quantity</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="quantityText" type="number" name="quantityText" placeholder="Enter Quantity..."
                                    value={newMaterialQuantity} onChange={(event) => setNewMaterialQuantity(event.target.value)} />
                                <div id="editMaterialQuantityError" class="invalid-feedback"></div>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="priceText">Price</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="priceText" type="number" name="priceText" placeholder="Enter Price..."
                                    value={newMaterialPrice} onChange={(event) => setNewMaterialPrice(event.target.value)} />
                                <div class="invalid-feedback">Please enter a valid price</div>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={okEditMaterialModal}>OK</CButton>{' '}
                    <CButton color="secondary" onClick={cancelEditMaterialModal}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                id="laborModal"
                show={showLaborModal}
                onClose={toggleLaborModal}
            >
                <CModalHeader id="laborModalTitle"></CModalHeader>
                <CModalBody>
                    <CForm action="" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <input type="hidden" id="laborItemId" name="laborItemId"/>
                                <CLabel htmlFor="laborDescriptionInput">Description</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="laborDescriptionInput" name="laborDescriptionInput" placeholder="Enter Description..." />
                                <div class="invalid-feedback">Description must not be blank</div>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="laborQuantityInput">Quantity (hrs)</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="laborQuantityInput" type="number" name="laborQuantityInput" placeholder="Enter Quantity..." />
                                <div class="invalid-feedback">Quantity must be a number without decimals</div>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="laborRateInput">Price</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="laborRateInput" type="number" name="laborRateInput" placeholder="Enter Rate..." />
                                <div class="invalid-feedback">Please enter a valid rate</div>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={okAddLabor}>OK</CButton>{' '}
                    <CButton color="secondary" onClick={cancelAddLabor}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton type="button" id="completeJobButton" name="completeJobButton" 
                            size="lg" color="info" onClick={completeJob}>Complete Job</CButton>
                            <div id="jobCompletedBanner" hidden="true" class="p-3 mb-2 bg-success text-white"><h5>Job Completed</h5></div>
                        </CCardHeader>    
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            <h5>Job Detail<span class="span-right"><JobDetailHelpModal/></span></h5>
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
                                    <div class="invalid-feedback">Name must not be blank</div>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="customer">Customer</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CSelect type="customer" id="customer" name="customer" placeholder="Enter Customer..." autoComplete="customer"
                                            onChange={e => setJob({ ...job, 'jobCustomerId': e.target.value })} />
                                        <div class="invalid-feedback">Customer must be selected</div>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="startDate">Start Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="date" id="startDate" name="startDate" placeholder="Enter Start Date..." autoComplete="startDate"
                                            onChange={e => setJob({ ...job, 'startDate': e.target.value })} value={job.startDate} />
                                        <div class="invalid-feedback">Must be a valid date</div>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="endDate">End Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="date" id="endDate" name="endDate" placeholder="Enter End Date..." autoComplete="endDate"
                                            onChange={e => setJob({ ...job, 'endDate': e.target.value })} value={job.endDate} />
                                        <div id="endDateErrorMsg" class="invalid-feedback">Must be a valid date</div>
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter id="jobDetailFooter">
                            <CButton type="cancel" size="sm" color="danger" onClick={returnToJobs}><CIcon name="cil-ban" /> Cancel</CButton>
                            <CButton type="delete" size="sm" color="warning" onClick={() => deleteJob()} ><CIcon name="cil-x-circle" /> Delete</CButton>
                            <span class="span-right"><CButton type="update" size="sm" color="primary" onClick={() => updateJob()}><CIcon name="cil-check-circle" /> Update</CButton></span>
                        </CCardFooter>
                    </CCard>
                    <CCard>
                        <CCardHeader>
                            <h5>Invoices<span class="span-right"><InvoiceHelpModal/></span></h5>
                        </CCardHeader>
                        <CCardBody>
                        <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row id="generateInvoiceRow">
                                    <CCol xs="12" md="12">
                                        <div><CButton type="button" size="sm" color="info" onClick={() => { generateInvoice() }}>
                                            <CIcon name="cil-plus" /> Generate Invoice</CButton></div>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol id="tableCol">
                                        <CDataTable
                                            items={invoices}
                                            fields={invoiceFields}
                                            columnFilter
                                            tableFilter={tableFilterProps}
                                            footer
                                            itemsPerPageSelect
                                            itemsPerPage={5}
                                            hover
                                            sorter
                                            pagination
                                            onRowClick={(item) => history.push(`/invoice/${item.id}`)}
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>
                            <h5>Notes</h5>
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" className="form-horizontal">
                            <CFormGroup row>
                            </CFormGroup>
                            <CCol>
                                <CTextarea id="notesTextArea" onInput={showNotesSaveButton}></CTextarea>
                            </CCol>
                            </CForm>
                            <CCardFooter id="jobDetailFooter">
                              <div id="notesSaveButtonDiv">
                              <span class="span-right"><CButton id="notesSaveButton" type="update" size="sm" color="primary" onClick={() => saveNotes()}><CIcon name="cil-check-circle" /> Save</CButton></span>
                              </div>
                            </CCardFooter>
                        </CCardBody>  
                    </CCard>  
                </CCol>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            <h5>Job Material List<span class="span-right"><JobMaterialListHelpModal/></span></h5>
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row id="addMaterialsRow">
                                    <CCol xs="12" md="12">
                                        <div><CButton type="button" size="sm" color="info" onClick={() => { launchAddMaterialModal() }}>
                                            <CIcon name="cil-plus" /> Add Materials</CButton></div>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol id="tableCol">
                                        <CDataTable
                                            items={materialList}
                                            fields={materialFields}
                                            columnFilter
                                            tableFilter={tableFilterProps}
                                            footer
                                            itemsPerPageSelect
                                            itemsPerPage={5}
                                            hover
                                            sorter
                                            pagination
                                            scopedSlots={{
                                                'edit':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton type="button" size="sm" color="info" hidden={job.completed} onClick={() => { launchEditMaterialModal(item) }}>
                                                                    <CIcon name="cil-pencil" /></CButton>
                                                            </td>
                                                        )
                                                    },
                                                'remove':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton type="button" size="sm" color="danger" hidden={job.completed} onClick={() => { launchRemoveMaterialModal(item) }}>
                                                                    <CIcon name="cil-trash" /></CButton>
                                                            </td>
                                                        )
                                                    }
                                            }}
                                        />



                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>
                            <h5>Labor<span class="span-right"><LaborHelpModal/></span></h5>
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" className="form-horizontal">
                                <CFormGroup row id="addLaborRow">
                                    <CCol xs="12" md="12">
                                        <div><CButton type="button" size="sm" color="info" onClick={() => { launchAddLaborModal() }}>
                                            <CIcon name="cil-plus" /> Add Labor Item</CButton></div>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol id="tableCol">
                                        <CDataTable
                                            items={laborList}
                                            fields={laborFields}
                                            columnFilter
                                            tableFilter={tableFilterProps}
                                            footer
                                            itemsPerPageSelect
                                            itemsPerPage={5}
                                            hover
                                            sorter
                                            pagination
                                            scopedSlots={{
                                                'edit':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton type="button" size="sm" color="info" hidden={job.completed} onClick={() => { launchEditLaborModal(item) }}>
                                                                    <CIcon name="cil-pencil" /></CButton>
                                                            </td>
                                                        )
                                                    },
                                                'remove':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton type="button" size="sm" color="danger" hidden={job.completed} onClick={() => { launchRemoveLaborModal(item) }}>
                                                                    <CIcon name="cil-trash" /></CButton>
                                                            </td>
                                                        )
                                                    }
                                            }}
                                        />



                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                    </CCard>                   
                </CCol>
            </CRow>
        </>
    )

}

export default Job
