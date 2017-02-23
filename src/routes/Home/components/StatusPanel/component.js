import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import style from './style.scss'
import palette from '../../styles/palette'


const styleProps = {
  select: {
    style: {
      width: 'calc(90%)',
      marginLeft: 16
    },
    menuStyle: {
      backgroundColor: palette.secondaryBackgroundColor,
      borderRadius: 8,
      boxShadow: 'none',
      padding: 0
    },
    labelStyle: {
      marginLeft: '16px',
      fontWeight: 100,
      fontSize: 14,
      color: palette.textColor
    },
    iconStyle: {
      backgroundColor: palette.secondaryBackgroundColor,
      fill: palette.accentBackgroundColor,
      borderRadius: 8
    },
    menuItemStyle: {
      backgroundColor: palette.secondaryBackgroundColor,
      fontWeight: 100,
      color: palette.textColor,
      fontSize: 14,
      height: 32
    },
    listStyle: {
      backgroundColor: palette.secondaryBackgroundColor,
      borderRadius: 8,
      padding: 0,
      margin: 0
    },
    selectedMenuItemStyle: {
      fontWeight: 100,
      color: palette.accentTextColor,
      fontSize: 14
    }
  },
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

class StatusPanel extends Component {

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.model}>
          <div className={style.modelHeader}>
            <div className={style.modelTitle}>选择模型</div>
          </div>
          <SelectField
            className={style.modelSelect} value={1} onChange={undefined}
            autoWidth fullWidth={false} underlineShow={false}
            {...styleProps.select}
          >
            <MenuItem value={1} primaryText="随机森林" />
            <MenuItem value={2} primaryText="神经网络" />
          </SelectField>
        </div>
        <div className={style.name}>
          <div className={style.nameHeader}>
            <span className={style.nameTitle}>编辑模型</span>
            <FlatButton
              className={style.nameButton} label="保存" primary
              style={styleProps.button}
            />
          </div>
          <TextField
            id="name_field" underlineShow={false}
            style={styleProps.text}
          />
        </div>
        <div className={style.exec}>
          <div className={style.execHeader}>
            <span className={style.execTitle}>训练模型</span>
            <FlatButton
              className={style.execButton} label="运行" primary
              style={styleProps.button}
            />
          </div>
          <TextField
            id="exec_field" underlineShow={false}
            style={styleProps.text}
          />
        </div>
      </div>
    )
  }
}

export default StatusPanel
