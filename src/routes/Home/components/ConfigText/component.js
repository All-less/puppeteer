import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

import style from './style.scss'
import palette from '../../styles/palette'


const textStyle = {
  width: 150,
  backgroundColor: 'white',
  borderRadius: 4,
  margin: 8,
  height: 32,
  padding: 4,
  fontWeight: 100,
  fontSize: 14,
  color: palette.textColor,
}

class ConfigText extends Component {
  render() {
    const { name, args } = this.props
    return (
      <div className={style.wrapper}>
        <span className={style.configLabel}>{name}</span>
        <TextField id={name} underlineShow={false} style={textStyle} />
      </div>
    )
  }
}

export default ConfigText
