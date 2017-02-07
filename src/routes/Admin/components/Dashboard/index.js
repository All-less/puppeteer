import React from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
import dialogPolyfill from 'dialog-polyfill'

import BackendTable from '../BackendTable'
import style from './style.scss'


class Dashboard extends React.Component {

  state = {
    showModal: false,
    dialog: null
  }

  constructor(props) {
    super(props)
    this.handleFabClick = this.handleFabClick.bind(this)
    this.handleModalCancel = this.handleModalCancel.bind(this)
    this.handleModalSubmit = this.handleModalSubmit.bind(this)
  }

  handleFabClick(event) {
    this.setState({ showModal: true })
    this.dialog && this.dialog.showModal()
  }

  handleModalCancel(event) {
    this.dialog && this.dialog.close()
  }

  handleModalSubmit(event) {

  }

  render() {
    return (
      <div>
         <dialog className="mdl-dialog" ref={(dialog) => { this.dialog = dialog }}>
            <div className="mdl-dialog__content">
              <h5>添加后端</h5>
              <form action="#">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="backend_name"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">名称</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="backend_addr"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">远端地址</label>
                </div>
              </form>
              </div>
              <div className="mdl-dialog__actions">
                <button
                  type="button"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                  onClick={this.handleModalCancel}
                  >
                  取消
                </button>
                <button
                  type="button"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                  onClick={this.handleModalSubmit}
                  >
                  提交
                </button>
              </div>
          </dialog>
        <div className={style.table}>
          <BackendTable/>
        </div>
        <button
          className={cn(style.fab, "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect")}
          onClick={this.handleFabClick}
          >
          <i className="material-icons">add</i>
        </button>

      </div>
    )
  }
}

export default Dashboard
