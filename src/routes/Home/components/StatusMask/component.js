import React, { Component, PropTypes } from 'react'

import style from './style.scss'

class StatusMask extends Component {
  render() {
    return (
      <div className={style.text}>{this.props.content}</div>
    )
  }
}

export default StatusMask
