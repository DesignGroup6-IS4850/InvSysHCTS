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

import { API } from 'aws-amplify';
import { listCustomers } from '../../graphql/queries';

import CustomerHelpModal from '../help/CustomerHelpModal'

const Customers = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [pageCount, setPageCount] = useState(10)

  const [customers, setCustomers] = useState([]);

  const tableFilterProps = {placeholder: ' '}

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/customers?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listCustomers });
    setCustomers(apiData.data.listCustomers.items);
  }

  function calculatePageCount(itemsPerPage) {
    setPageCount(Math.ceil(customers.length/itemsPerPage));
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <h5>Customers<span class="span-right"><CustomerHelpModal/></span></h5>
          </CCardHeader>
          <CCardBody>
          <Link to="/newcustomer">Add New Customer</Link>
          <CDataTable
            items={customers}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'email', 'phone', 'address'
            ]}
            hover
            striped
            itemsPerPage={10}
            itemsPerPageSelect
            activePage={page}
            clickableRows
            columnFilter
            tableFilter={tableFilterProps}
            sorter
            onPaginationChange={(itemsPerPage) => calculatePageCount(itemsPerPage)}
            onRowClick={(item) => history.push(`/customer/${item.id}`)}
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

export default Customers
