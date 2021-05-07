import React, {useState} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { NotificationContext } from '../notifications/NotificationContext';

const TheLayout = () => {

  const[notifications, setNotifications] = useState([]);
  // const{notifications, setNotifications} = useState([]);

  return (
    <NotificationContext.Provider value={[notifications, setNotifications]}>
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
    </NotificationContext.Provider>
  )
}

export default TheLayout
