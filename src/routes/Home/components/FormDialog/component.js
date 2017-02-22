import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import style from './style.scss'
import palette from '../../styles/palette'


const styleProps = {
  dialog: {
    width: 300
  },
  text: {
    backgroundColor: palette.secondaryBackgroundColor,
    color: palette.textColor,
    borderRadius: 8,
    padding: 8,
    marginBottom: 24,
    width: 240
  },
  button: {
    marginRight: 24,
    marginBottom: 16,
    color: palette.textColor
  }
}

class FormDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    upperHint: PropTypes.string.isRequired,
    lowerHint: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    errorText: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleUpperChange: PropTypes.func.isRequired,
    handleLowerChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      open, upperHint, lowerHint, buttonText, errorText, handleClose,
      handleSubmit, handleUpperChange, handleLowerChange
    } = this.props
    const actions = [
      <RaisedButton
        label={buttonText} style={styleProps.button}
        onClick={handleSubmit}
      />
    ]
    return (
      <Dialog
        actions={actions} modal={false} open={open}
        onRequestClose={handleClose} contentStyle={styleProps.dialog}
      >
        <TextField
          id="upper_field" underlineShow={false} onChange={handleUpperChange}
          style={styleProps.text} hintText={upperHint}
        />
        <br />
        <TextField
          id="lower_field" underlineShow={false} onChange={handleLowerChange}
          style={styleProps.text} hintText={lowerHint} type="password"
        />
        {
          errorText && (
            <div className={style.error}>
              {
                errorText.split('\n').map(
                  (text, index) => (<span key={index}>{text}<br /></span>)
                )
              }
            </div>
          )
        }
      </Dialog>
    )
  }
}

export default FormDialog
