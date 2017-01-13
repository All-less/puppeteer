import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react';
import cn from 'classnames'
import _ from 'lodash'

import style from './style.scss'


class StepMenu extends React.Component {

  static propTypes = {
    items: React.PropTypes.array.isRequired,

    toggle: React.PropTypes.func.isRequired
  }

  render() {
    const asideClass = cn('mdl-components__nav', 'docs-text-styling', 'mdl-shadow--4dp')
    const itemClass = cn('mdl-components__link', 'mdl-component', style.item)
    const subitemClass = cn('mdl-components__link', 'mdl-component', style.subitem)
    const iconClass = cn('mdl-components__link-image', style.icon)
    const textClass = cn('mdl-components__link-text', style.text)

    const { items, toggle } = this.props

    return (
      <aside
        className={asideClass}
        style={{ 'height': '100%', 'overflow': 'scroll' }}>
        {
          items.map((item, index) => (
            <div key={index}>
              <a className={itemClass} href='#' onClick={toggle.bind(this, index)}>
                <img className={iconClass} src={item.icon}/>
                <span className={textClass}>{item.name}</span>
              </a>
              <VelocityTransitionGroup component="div" enter="slideDown" leave="slideUp">
                {
                  item.expanded && item.subitems.map((name, index) => (
                    <div key={index}>
                      <a key={index} className={subitemClass} href='#'>
                        <span className={textClass}>{name}</span>
                      </a>
                    </div>
                  ))
                }
              </VelocityTransitionGroup>
            </div>
          ))
        }
      </aside>
    )
  }
}

export default StepMenu
