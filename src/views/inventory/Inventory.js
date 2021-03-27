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

  const [inventoryItems, setInventoryItems] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/inventory?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  async function fetchInventoryItems() {
    const apiData = await API.graphql({ query: listInventoryItems });
    setInventoryItems(apiData.data.listInventoryItems.items);
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Inventory
          </CCardHeader>
          <CCardBody>
          <Link to="/newinventoryitem">Add New Inventory Item</Link>
          <CDataTable
            items={inventoryItems}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'quantity', 'description', 'brand', 'category'
            ]}
            hover
            striped
            itemsPerPage={8}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/inventory/${item.id}`)}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
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
