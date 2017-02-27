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
  }
}

class ModelTrain extends Component {
  render() {
    const { running, handleRun, res } = this.props
    return (
      <div className={style.wrapper}>
        <div className={style.top}>
          <span className={style.title}>训练模型</span>
          <FlatButton
            className={style.button} label="运行" primary onClick={handleRun}
            style={styleProps.button} disabled={running}
          />
        </div>
        <TextField
          id="exec_field" underlineShow={false} multiLine rowsMax={5}
          style={styleProps.text} rows={5} value={res.join('\n')}
        />
      </div>
    )
  }
}

export default ModelTrain
