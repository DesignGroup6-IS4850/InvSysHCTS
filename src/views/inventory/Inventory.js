import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton
} from '@coreui/react'

// import inventoryData from './InventoryData'

import { API } from 'aws-amplify';
import { listInventoryItems } from '../../graphql/queries';

const Inventory = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [pageCount, setPageCount] = useState(10)

  const [inventoryItems, setInventoryItems] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/inventory?page=${newPage}`)
  }

  const tableFilterProps = {placeholder: ' '}

  const noItemsViewProps={ noResults: 'No items meet this filter criteria', noItems: 'No items to show' }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    fetchInventoryItems();
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

  function calculatePageCount(itemsPerPage) {
    setPageCount(Math.ceil(inventoryItems.length/itemsPerPage));
  }

  const getStatusBadge = (item)=>{
    if (inventoryIsLow(item)) {
      return 'danger'
    } else {
      return ''
    }
  }

  const getStatusText = (item)=>{
    if (inventoryIsLow(item)) {
      return 'Low Inventory'
    } else {
      return ''
    }
  }

  const inventoryIsLow = (item)=>{
    return ((item.lowInventoryThreshold !=null) && (item.quantity <= item.lowInventoryThreshold));
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <h5>Inventory</h5>
          </CCardHeader>
          <CCardBody>
          <Link to="/newinventoryitem">Add New Inventory Item</Link>
          <CDataTable 
            id="inventoryTable"
            name="inventoryTable"
            items={inventoryItems}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'quantity', 'description', 'brand', 'category', 'status'
            ]}
            hover
            itemsPerPage={10}
            itemsPerPageSelect
            activePage={page}
            clickableRows
            columnFilter
            tableFilter={tableFilterProps}
            sorter
            onPaginationChange={(itemsPerPage) => calculatePageCount(itemsPerPage)}
            onRowClick={(item) => history.push(`/inventory/${item.id}`)} 
            noItemsView={noItemsViewProps}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getStatusBadge(item)}>
                    {getStatusText(item)}
                    </CBadge>
                  </td>
                )}}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={pageCount}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Inventory
