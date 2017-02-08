import React, { Component, PropTypes } from 'react'


class BackendModal extends Component {

  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    showSnackbar: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    addBackend: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleModalCancel = this.handleModalCancel.bind(this)
    this.handleModalSubmit = this.handleModalSubmit.bind(this)
  }

  handleModalCancel() {
    this.props.toggleModal(false)
  }

  handleModalSubmit() {
    const { toggleModal, showSnackbar, mutate, addBackend } = this.props
    const name = this.nameInput.value
    const addr = this.addrInput.value
    toggleModal(false)
    if (!name) { showSnackbar({ message: '名称不能为空' }) }
    else if (!addr) { showSnackbar({ message: '远端地址不能为空' }) }
    else {
      mutate({ variables: { name, addr } })
        .then((res) => {
          showSnackbar({ message: '添加成功' })
          addBackend(res.data.createBackend)
        }).catch((error) => {
          console.error(error)
        })
    }
  }

  componentDidUpdate() {
    if (this.props.showModal) {
      this.dialog.showModal()
    } else {
      this.dialog.close()
    }
  }

  render() {
    return (
      <dialog className="mdl-dialog" ref={(dialog) => { this.dialog = dialog }}>
        <form action="#">
          <div className="mdl-dialog__content">
            <h5>添加后端</h5>
              <div id="name_field" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="backend_name"
                  ref={(input) => { this.nameInput = input }}/>
                <label className="mdl-textfield__label" htmlFor="backend_name">名称</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="backend_addr"
                  ref={(input) => { this.addrInput = input }}/>
                <label className="mdl-textfield__label" htmlFor="backend_addr">远端地址</label>
              </div>
          </div>
          <div className="mdl-dialog__actions">
            <button type="button" onClick={this.handleModalCancel}
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              取消
            </button>
            <button type="button" onClick={this.handleModalSubmit}
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              提交
            </button>
          </div>
        </form>
      </dialog>
    )
  }
}

export default BackendModal
