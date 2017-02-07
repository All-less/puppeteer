import React from 'react'
import cn from 'classnames'
import _ from 'lodash'

import style from './style.scss'


const mock = {
  width: ['10%', '10%', '15%', '35%'],
  titles: ['名称', '运行状态', '远端地址', '提供服务'],
}

class BackendTable extends React.Component {
  render() {
    const { loading, error } = this.props.data
    return (
      <table className={cn("mdl-data-table mdl-js-data-table mdl-shadow--2dp")}>
        <thead>
          <tr>
            {
              _.concat(mock.titles.map((title, i) => (
                  <th key={i} className="mdl-data-table__cell--non-numeric" style={{ width: mock.width[i] }}>{title}</th>
                )), (
                  <th key={999} className="mdl-data-table__cell--non-numeric" style={{ width: '5%'}}>操作</th>
                )
              )
            }
          </tr>
        </thead>
        <tbody>
          { // TODO: add loading animation
            !loading && !error && this.props.data.backendList.map((backend, i) => (
              <tr key={i}>
                <td className="mdl-data-table__cell--non-numeric">{backend.name}</td>
                <td className="mdl-data-table__cell--non-numeric">{backend.status}</td>
                <td className="mdl-data-table__cell--non-numeric">{backend.remote}</td>
                <td className="mdl-data-table__cell--non-numeric">{backend.service}</td>
                <td key={999} className="mdl-data-table__cell--non-numeric">
                  <a href="javascript:void(0)" style={{ color: 'rgba(0,0,0,.54)'}}>
                    <i className="material-icons">settings_applications</i>
                  </a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default BackendTable
