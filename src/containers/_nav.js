import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tasks']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Inventory',
    to: '/inventory',
    icon: 'cil-layers',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Calendar',
    to: '/calendar',
    icon: 'cil-calendar',
  }
]

export default _nav
