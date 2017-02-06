import React from 'react'
import cn from 'classnames'
import _ from 'lodash'

import style from './style.scss'


const mock = {
  width: ['10%', '10%', '15%', '35%'],
  titles: ['名称', '运行状态', '远端地址', '提供服务'],
  entries: [
    ['oozie', '运行中', 'localhost:10000', 'hive 查询结果、随机森林'],
    ['tensorflow', '已停止', 'localhost:10000', 'hive 查询结果、随机森林'],
    ['mxnet', '运行中', 'localhost:10000', 'hive 查询结果、随机森林']
  ]
}

class BackendTable extends React.Component {
  render() {
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
          {mock.entries.map((row, i) => (
            <tr key={i}>
              {
                _.concat(row.map((e, i) => (
                    <td key={i} className="mdl-data-table__cell--non-numeric">{e}</td>
                  )), (
                    <td key={999} className="mdl-data-table__cell--non-numeric">
                      <a href="javascript:void(0)" style={{ color: 'rgba(0,0,0,.54)'}}>
                        <i className="material-icons">settings_applications</i>
                      </a>
                    </td>
                  )
                )
              }
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default BackendTable
