import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { API } from 'aws-amplify';
import { listJobs } from '../../graphql/queries';

const Jobs = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const [jobs, setJobs] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/job?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const apiData = await API.graphql({ query: listJobs });
    setJobs(apiData.data.listJobs.items);
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Jobs
          </CCardHeader>
          <CCardBody>
          <Link to="/newjob">Add New Job</Link>
          <CDataTable
            items={jobs}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'startDate', 'endDate'
            ]}
            hover
            striped
            itemsPerPage={8}
            itemsPerPageSelect
            activePage={page}
            clickableRows
            columnFilter
            tableFilter
            sorter
            onRowClick={(item) => history.push(`/job/${item.id}`)}
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

export default Jobs
