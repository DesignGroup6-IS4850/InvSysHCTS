import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { API } from 'aws-amplify';
import { listInventoryItems } from '../graphql/queries';
import {NotificationContext} from '../notifications/NotificationContext'


const TheHeaderDropdownNotif = () => {

  const history = useHistory()

  const [menuItems, setMenuItems] = useState([]);

  const [notifications, setNotifications] = useContext(NotificationContext);

  useEffect(() => {
    fetchInventoryItems();
  },[]);

  useEffect(()=> {
    createMenuItems();
  }, [JSON.stringify(notifications)]);

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

    notifyLowStock(retrievedInventoryItems);

  }

  function notifyLowStock(inventoryItems) {
    var newNotifications = new Array();
    inventoryItems.map(item => {
        if ((item.lowInventoryThreshold !=null) && (item.quantity <= item.lowInventoryThreshold)) {
          newNotifications.push({text: "Low Stock - " + item.name, id: item.id})
        }
    });
    setNotifications(newNotifications)
  }

  function createMenuItems() {

    const inventoryMenuItems = new Array();

    notifications.map(notification => {
      inventoryMenuItems.push(<CDropdownItem id={notification.id} component="button" onClick={e => goToItem(e)}><CIcon name="cil-layers" className="mr-2 text-danger" />{notification.text}</CDropdownItem>)  
    })

    setMenuItems(inventoryMenuItems);
  }

  function goToItem(e) {
    console.log(e.target.id + " was clicked")
    history.push(`/inventory/${e.target.id}`)
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell"/>
        <CBadge shape="pill" color="danger">{notifications.length}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu  id="dropDownMenu" placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {notifications.length} notifications</strong>
        </CDropdownItem>
        {menuItems}
{/*         <CDropdownItem><CIcon name="cil-user-follow" className="mr-2 text-success" /> New user registered</CDropdownItem>
        <CDropdownItem><CIcon name="cil-user-unfollow" className="mr-2 text-danger" /> User deleted</CDropdownItem>
        <CDropdownItem><CIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales report is ready</CDropdownItem>
        <CDropdownItem><CIcon name="cil-basket" className="mr-2 text-primary" /> New client</CDropdownItem>
        <CDropdownItem><CIcon name="cil-speedometer" className="mr-2 text-warning" /> Server overloaded</CDropdownItem> */}
{/*         <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Server</strong>
        </CDropdownItem> */}
{/*         <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>CPU Usage</b></small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>Memory Usage</b></small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif