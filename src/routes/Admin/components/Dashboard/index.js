import React from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'

import BackendTable from '../BackendTable'
import style from './style.scss'


class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className={style.table}>
          <BackendTable/>
        </div>
        <button className={cn(style.fab, "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect")}>
          <i className="material-icons">add</i>
        </button>
      </div>
    )
  }
}

export default Dashboard
