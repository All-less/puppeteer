import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import style from './style.scss'
import palette from '../../styles/palette'


const textStyle = {
  width: 150,
  backgroundColor: 'white',
  borderRadius: 4,
  margin: 8,
  height: 32,
  padding: 4
}

const selectStyle = {
  style: { // overall element
    width: 150,
    height: 32,
    margin: 8
  },
  labelStyle: { // displayed text
    marginLeft: 16,
    fontWeight: 100,
    fontSize: 14,
    color: '#616668',
    marginTop: -8 // We set height to 32px, but the label and
                  // icon won't be vertically center. So we need to
                  // lift it up. So if for iconStyle.marginTop = -8
  },
  menuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: 'none',
    padding: 0,
  },
  iconStyle: {
    marginTop: -8
  },
  menuItemStyle: {
    backgroundColor: 'white',
    fontWeight: 100,
    color: palette.textColor,
    fontSize: 14,
    height: 32
  },
  selectedMenuItemStyle: {
    fontWeight: 100,
    color: palette.accentTextColor,
    fontSize: 14
  }
}

class ConfigField extends Component {

  renderText(name, args) {
    return (
      <div className={style.wrapper}>
        <span className={style.configLabel}>{name}</span>
        <TextField id={name} underlineShow={false} style={textStyle} />
      </div>
    )
  }

  renderSelect(name, args) {
    return (
      <div className={style.wrapper}>
        <span className={style.configLabel}>{name}</span>
        <SelectField
          value={1} autoWidth fullWidth={false}
          underlineShow={false} {...selectStyle}
          >
          {
            (args.type === 'BOOL' ? ['是', '否'] : args.options).map((option, index) => (
              <MenuItem key={index} value={index} primaryText={option} />
            ))
          }
        </SelectField>
      </div>
    )
  }

  render() {
    const { name, args } = this.props
    switch (args.type) {
      case 'TEXT': case 'INTEGER': case 'FLOAT':
        return this.renderText(name, args)
      case 'SELECT': case 'BOOL':
        return this.renderSelect(name, args)
    }
  }
}

export default ConfigField
