import React, { Component, PropTypes } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
import dialogPolyfill from 'dialog-polyfill'

import BackendTable from '../BackendTable'
import BackendModal from '../BackendModal'
import style from './style.scss'


class Dashboard extends Component {

  static propTypes = {
    toggleModal: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleFabClick = this.handleFabClick.bind(this)
  }

  handleFabClick(event) {
    this.props.toggleModal(true)
  }

  handleModalSubmit(event) {
    /*
    if (this.nameInput.value)

    this.props.mutate({
      variables: {
        $name: this.nameInput.value,
        $remote: this.addrInput.value
      }
    })
    this.nameInput.value
    this.addrInput.value
    */
  }

  render() {
    return (
      <div>
        <BackendModal/>
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
