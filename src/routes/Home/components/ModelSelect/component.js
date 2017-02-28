import React, { Component, PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import style from './style.scss'
import palette from '../../styles/palette'


const styleProps = {
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
    color: palette.textColor,
    minHeight: 56
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
}

class ModelSelect extends Component {
  render() {
    const { curName, names, handleChange, value, newModel } = this.props
    return (
      <div className={style.wrapper}>
        <div className={style.top}>
          <div className={style.title}>选择模型</div>
        </div>
        {/*
        <FlatButton
          className={style.button} label="新建" primary
          style={styleProps.button} onClick={newModel}
        />
        */}
        <SelectField
          className={style.select} value={curName} onChange={handleChange}
          autoWidth fullWidth={false} underlineShow={false}
          {...styleProps}
        >
          {
            names.map(name => (
              <MenuItem key={name} value={name} primaryText={name} />
            ))
          }
        </SelectField>
      </div>
    )
  }
}

export default ModelSelect
