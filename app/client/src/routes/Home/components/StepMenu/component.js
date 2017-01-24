import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react';
import cn from 'classnames'
import _ from 'lodash'
import invariant from 'invariant'

import style from './style.scss'


class StepMenu extends React.Component {

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    creatingNodeId: React.PropTypes.string,

    toggle: React.PropTypes.func.isRequired,
    createNode: React.PropTypes.func.isRequired,
    updateNodePos: React.PropTypes.func.isRequired,
    setCreating: React.PropTypes.func.isRequired,
    removeNode: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

   handleMouseMove(event) {
    event.preventDefault()
    const { creatingNodeId, updateNodePos } = this.props
    if (creatingNodeId) {
      updateNodePos(creatingNodeId, event.clientX, event.clientY)
    }
  }

  handleMouseUp(event) {
    event.preventDefault()
    const { creatingNodeId, setCreating, removeNode } = this.props
    if (creatingNodeId) {
      removeNode(creatingNodeId)
      setCreating(null)
    }
  }

  handleMouseDown(type, subtype, color, event) {
    event.preventDefault()
    const { creatingNodeId, setCreating, createNode } = this.props
    invariant(!creatingNodeId, 'The creatingNodeId is not null when attempting to create a node.')
    const id = _.uniqueId()
    setCreating(id)
    createNode(id, event.clientX, event.clientY, type, subtype, color)
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
        style={{ 'height': '100%', 'overflow': 'scroll' }}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
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
                      <a key={index} className={subitemClass} href='#'
                        onMouseDown={this.handleMouseDown.bind(this, item.name, name, item.color)}>
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
