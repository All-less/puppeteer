import React, { Component, PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import style from './style.scss'
import palette from '../../styles/palette'


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
    color: palette.textColor,
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

class ConfigSelect extends Component {
  render() {
    const { name, type, options, value, handleChange } = this.props
    return (
      <div className={style.wrapper}>
        <span className={style.configLabel}>{name}</span>
        <SelectField
          value={value} autoWidth fullWidth={false} onChange={handleChange}
          underlineShow={false} {...selectStyle}
          >
          {
            (type === 'BOOL' ? ['是', '否'] : options).map((option) => (
              <MenuItem key={option} value={option} primaryText={option} />
            ))
          }
        </SelectField>
      </div>
    )
  }
}

export default ConfigSelect
