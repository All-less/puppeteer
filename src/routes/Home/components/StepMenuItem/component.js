import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import FontIcon from 'material-ui/FontIcon'
import { VelocityTransitionGroup } from 'velocity-react'

import style from './style.scss'
import StepMenuSubitem from '../StepMenuSubitem'


const itemClass = cn('mdl-components__link', 'mdl-component', style.item)
const arrowClass = cn('material-icons', style.arrow)
const textClass = cn('mdl-components__link-text', style.text)

class StepMenuItem extends Component {

  render() {
    const { expanded, subitems, phase, handleClick } = this.props
    return (
      <div>
        <a className={itemClass} href="javascript:void(0);" onClick={handleClick}>
          <span className={textClass}>{phase}</span>
          <FontIcon className={arrowClass} style={{ fontSize: '16px' }}>
            { expanded ? 'expand_less' : 'expand_more' }
          </FontIcon>
        </a>
        <VelocityTransitionGroup component="div" enter="slideDown" leave="slideUp">
          {
            expanded && subitems.map((subitem, index) => (
              <StepMenuSubitem
                phase={phase} step={subitem.name} key={index} backend={subitem.backend}
                color={'color'} config={JSON.parse(subitem.config)}
              />
            ))
          }
        </VelocityTransitionGroup>
      </div>
    )
  }
}

export default StepMenuItem
