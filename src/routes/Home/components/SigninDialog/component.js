import React, { Component, PropTypes } from 'react'

import FormDialog from '../FormDialog'
import style from './style.scss'


class SigninDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    error: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleUpperChange: PropTypes.func.isRequired,
    handleLowerChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      open, error, handleClose, handleSubmit,
      handleUpperChange, handleLowerChange
    } = this.props
    return (
      <FormDialog
        open={open} upperHint={'请输入用户名'} lowerHint={'请输入密码'}
        buttonText={'登录'} errorText={error} handleClose={handleClose}
        handleSubmit={handleSubmit} handleUpperChange={handleUpperChange}
        handleLowerChange={handleLowerChange}
      />
    )
  }
}

export default SigninDialog
