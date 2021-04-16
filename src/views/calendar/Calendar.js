import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
/* import PropTypes from 'prop-types';
import { CWidgetBrand, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from '../charts/ChartLineSimple'; */
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

import { API } from 'aws-amplify';
import { listJobs } from '../../graphql/queries';


const Calendar = () => {

  const history = useHistory();
  const [jobEvents, setJobEvents] = useState([]);

  function handleDateClick(info) {

  }

  function handleEventClick(info) {
    history.push(`/job/${info.event.id}`)
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const apiData = await API.graphql({ query: listJobs });
    var jobEventsArray = new Array();
    apiData.data.listJobs.items.map(job => {

        var color = (job.completed ? 'gray' : '#13aac8')

        jobEventsArray.push(
            {
                id: job.id, title: job.name,
                date: job.startDate,
                color: color
            })
    });
    setJobEvents(jobEventsArray);
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      dateClick={(info) => handleDateClick(info)}
      eventClick={(info) => handleEventClick(info)}
      events={jobEvents}
    />
  )
}
export default Calendar