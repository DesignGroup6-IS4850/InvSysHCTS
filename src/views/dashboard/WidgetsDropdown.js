import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CCard,

} from '@coreui/react'
import Calendar from '../calendar/Calendar'
import Inventory from '../inventory/Inventory'
import { listJobInventorys, listJobs } from 'src/graphql/queries'
import Jobs from '../job/Jobs'
import { createInventoryItem } from 'src/graphql/mutations'
import NewInventoryItem from '../inventory/NewInventoryItem'
import Alerts from '../notifications/alerts/Alerts'
import { AmplifyFederatedButtons } from '@aws-amplify/ui-react'
import Customer from '../customer/Customer'
import Customers from '../customer/Customers'

const WidgetsDropdown = () => {
  // render
  return (
    <CRow>
      <CCol sm="12" lg="6">
        <Calendar

        >  
        </Calendar>
      </CCol> 


      <CCol sm="12" lg="6">
        <Jobs
  
        >
        </Jobs>
      </CCol>


      <CCol sm="12" lg="6">
        <Inventory 
  
        >  
        </Inventory>
      </CCol>

      <CCol sm="12" lg="6">
        <Customers></Customers>
        
      </CCol>

      {/* <CCol sm="12" lg="6"> */}
               {/* <div class="card text-center">
                    <div class="card-header">
                      <ul class="nav nav-pills card-header-pills">
                        <li class="nav-item">
                          <a class="nav-link active" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                      </ul>
                    </div>
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">It's a broader card with text below as a natural lead-in to extra content. This content is a little longer.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>  */}

                {/* <div class="card text-center">
                  <div class="card-header">
                    <ul class="nav nav-pills card-header-pills">
                      <li class="card title">Helpful Links</li>
                    </ul>
                  </div>
                    <div class="card-body">
                      <h5 class="card-title"></h5>
                      <p class="card-text">Amazon</p>
                      <a href="#" class="btn btn-primary">Amazon.com</a>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title"></h5>
                      <p class="card-text">Home Depot</p>
                      <a href="#" class="btn btn-primary">HomeDepot.com</a>
                    </div>
                </div> */}

      {/* </CCol> */}

      
    </CRow>
  )
}

export default WidgetsDropdown