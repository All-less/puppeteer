import React from 'react'
import cn from 'classnames'

import style from './style.scss'


const mock = {
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
      <table className={cn(style.table, "mdl-data-table mdl-js-data-table mdl-shadow--2dp")}>
        <thead>
          <tr>
            {mock.titles.map((title, i) => (
              <th key={i} className="mdl-data-table__cell--non-numeric">{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mock.entries.map((row, i) => (
            <tr key={i}>
              {
                row.map((e, i) => (
                  <td key={i} className="mdl-data-table__cell--non-numeric">{e}</td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default BackendTable
