import React from 'react'
import cn from 'classnames'

import Sidebar from '../Sidebar'
import Dashboard from '../Dashboard'
import Header from '../Header'
import style from './style.scss'


class AdminLayout extends React.Component {
  render() {
    return (
      <div className={cn(style.layout, "mdl-layout", "mdl-js-layout", "mdl-layout--fixed-drawer", "mdl-layout--fixed-header")}>
        <header className={cn(style.header, "mdl-layout__header", "mdl-color--grey-100", "mdl-color-text--grey-600")}>
          <Header />
        </header>
        <div className={cn(style.drawer, "mdl-layout__drawer", "mdl-color--blue-grey-900", "mdl-color-text--blue-grey-50")}>
          <Sidebar />
        </div>
        <main className={cn("mdl-layout__content", "mdl-color--grey-100")}>
          <Dashboard />
        </main>
      </div>
    )
  }
}

export default AdminLayout
