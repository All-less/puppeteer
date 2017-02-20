import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import _ from 'lodash'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import style from './style.scss'


const headers = {
  widths: ['10%', '10%', '15%', '35%', '5%'],
  titles: ['名称', '运行状态', '远端地址', '提供服务', '操作'],
}

class BackendTable extends React.Component {

  static propTypes = {
    backends: PropTypes.array.isRequired,
    removeBackend: PropTypes.func.isRequired,
    refreshBackend: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleOperationClose = this.handleOperationClose.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.state = {
      open: false, // popover menu
      anchor: null, // anchor element for popover
      id: null // id of backend which invokes popover menu
    }
  }

  handleOperationClick(id, event) {
    this.setState({
      open: true,
      anchor: event.target,
      id: id
    })
  }

  handleOperationClose(event) {
    if (event == 'clickAway') {
      this.setState({ open: false })
    }
  }

  handleRefreshClick(event) {
    this.setState({ open: false })
    // const { }

  }

  handleDeleteClick(event) {
    this.setState({ open: false })
    const { deleteBackend, removeBackend, showSnackbar } = this.props
    deleteBackend({ variables: { id: this.state.id }})
      .then(() => {
        removeBackend(this.state.id)
        showSnackbar({ message: '后端移除成功' })
      })
      .catch((err) => {
        showSnackbar({ message: '后端移除失败' })
        console.error(err)
      })
  }

  render() {
    const { backends } = this.props
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
                      onClick={this.handleOperationClick.bind(this, backend.id)}>
                      <i className="material-icons">settings_applications</i>
                    </a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchor}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleOperationClose}
          useLayerForClickAway
          >
          <Menu>
            <MenuItem primaryText="刷新"
              onClick={this.handleRefreshClick}
              leftIcon={
                <FontIcon className="material-icons">refresh</FontIcon>
              }/>
            <MenuItem primaryText="删除"
              onClick={this.handleDeleteClick}
              leftIcon={
                <FontIcon className="material-icons">delete</FontIcon>
              }/>
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default BackendTable
