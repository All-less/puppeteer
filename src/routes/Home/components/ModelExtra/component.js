import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

import style from './style.scss'
import palette from '../../styles/palette'


const styleProps = {
  text: {
    width: 'calc(90%)',
    backgroundColor: palette.secondaryBackgroundColor,
    borderRadius: 8,
    marginLeft: 16,
    padding: 8
  },
  textarea: {
    fontWeight: 100,
    fontSize: 14,
    color: palette.textColor
  }
}

class ModelExtra extends Component {
  render() {
    const { handleChange, value } = this.props
    return (
      <div className={style.wrapper}>
        <div className={style.top}>
          <span className={style.title}>额外参数</span>
        </div>
        <TextField
          id="extra_field" underlineShow={false} value={value || ''} multiLine
          style={styleProps.text} onChange={handleChange} rows={3} rowsMax={3}
          textareaStyle={styleProps.textarea}
        />
      </div>
    )
  }
}

export default ModelExtra
