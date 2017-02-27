import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import style from './style.scss'
import palette from '../../styles/palette'


const styleProps = {
  button: {
    lineHeight: 'inherit',
    height: 'inherit',
    width: 'initial',
    color: palette.accentTextColor
  },
  text: {
    width: 'calc(90%)',
    backgroundColor: palette.secondaryBackgroundColor,
    borderRadius: 8,
    marginLeft: 16,
    padding: 8
  },
  input: {
    fontWeight: 100,
    fontSize: 14,
    color: palette.textColor
  }
}

class ModelEdit extends Component {
  render() {
    const { handleChange, saveModel, curName, value } = this.props
    return (
      <div className={style.wrapper}>
        <div className={style.top}>
          <span className={style.title}>编辑模型</span>
          <FlatButton
            className={style.button} label="保存" primary
            style={styleProps.button} onClick={saveModel}
          />
        </div>
        <TextField
          id="name_field" underlineShow={false} value={value || ''}
          style={styleProps.text} onChange={handleChange}
          inputStyle={styleProps.input}
        />
      </div>
    )
  }
}

export default ModelEdit
