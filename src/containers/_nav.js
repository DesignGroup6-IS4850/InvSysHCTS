import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
/*   {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tasks']
  }, */
  {
    _tag: 'CSidebarNavItem',
    name: 'Calendar',
    to: '/calendar',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Jobs',
    to: '/jobs',
    icon: 'cil-briefcase',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Inventory',
    to: '/inventory',
    icon: 'cil-barcode',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customers',
    to: '/customers',
    icon: 'cil-address-book',
  }
]

export default _nav
