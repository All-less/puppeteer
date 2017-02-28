import React, { Component, PropTypes } from 'react'
import cn from 'classnames'

import style from './style.scss'


const subitemClass = cn('mdl-components__link', 'mdl-component', style.subitem)
const textClass = cn('mdl-components__link-text', style.text)

class StepMenuSubitem extends Component {

  render() {
    const { step, handleMouseDown } = this.props
    return (
      <div>
        <a
          className={subitemClass} href="javascript:void(0);"
          onMouseDown={handleMouseDown}
        >
          <span className={textClass}>{step}</span>
        </a>
      </div>
    )
  }
}

export default StepMenuSubitem
