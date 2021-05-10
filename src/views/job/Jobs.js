import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CBadge
} from '@coreui/react'

import { API } from 'aws-amplify';
import { listJobs } from '../../graphql/queries';
import JobsHelpModal from '../help/JobsHelpModal'

const Jobs = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [pageCount, setPageCount] = useState(10)

  const [jobs, setJobs] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/jobs?page=${newPage}`)
  }
  
  const tableFilterProps = {placeholder: ' '}

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

  function calculatePageCount(itemsPerPage) {
    setPageCount(Math.ceil(jobs.length/itemsPerPage));
  }

  const getStatusBadge = (item)=>{
    if (item.completed) {
      return 'success'
    } else {
      return 'info'
    }
  }

  const getStatusText = (item)=>{
    if (item.completed) {
      return 'Completed'
    } else {
      return 'Open'
    }
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <h5>Jobs<span class="span-right"><JobsHelpModal/></span></h5>
          </CCardHeader>
          <CCardBody>
          <Link to="/newjob">Add New Job</Link>
          <CDataTable
            items={jobs}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'startDate', 'endDate', "status"
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
            onRowClick={(item) => history.push(`/job/${item.id}`)}
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

export default Jobs
