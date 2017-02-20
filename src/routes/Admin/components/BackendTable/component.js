import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import _ from 'lodash'

import BackendPopover from '../BackendPopover'
import style from './style.scss'


const headers = {
  widths: ['10%', '10%', '15%', '35%', '5%'],
  titles: ['名称', '运行状态', '远端地址', '提供服务', '操作'],
}

class BackendTable extends React.Component {

  static propTypes = {
    backends: PropTypes.array.isRequired
  }

  render() {
    const { backends, handleOperation } = this.props
    return (
      <div>
        <table className={cn("mdl-data-table mdl-js-data-table mdl-shadow--2dp")}>
          <thead>
            <tr>
              {
                headers.titles.map((title, i) => (
                  <th key={i} className="mdl-data-table__cell--non-numeric" style={{ width: headers.widths[i] }}>{title}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            { // TODO: add loading animation
              // TODO: add pagination
              backends.map((backend, i) => (
                <tr key={i}>
                  <td className="mdl-data-table__cell--non-numeric">{backend.name}</td>
                  <td className="mdl-data-table__cell--non-numeric">{backend.status}</td>
                  <td className="mdl-data-table__cell--non-numeric">{backend.addr}</td>
                  <td className="mdl-data-table__cell--non-numeric">{backend.service}</td>
                  <td key={999} className="mdl-data-table__cell--non-numeric">
                    <a href="javascript:void(0)" style={{ color: 'rgba(0,0,0,.54)'}}
                      onClick={handleOperation(backend.id)}>
                      <i className="material-icons">settings_applications</i>
                    </a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <BackendPopover />
      </div>
    )
  }
}

export default BackendTable
