import React from 'react'
import invariant from 'invariant'

import style from './style.scss'


class Port extends React.Component {

  static PropTypes = {
    nodeId: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    // only 'in' and 'out' are allowed
    type: React.PropTypes.string.isRequired,
    creatingLink: React.PropTypes.bool.isRequired,
    creatingLinkSrc: React.PropTypes.object,

    setPortPos: React.PropTypes.func.isRequired,
    startLink: React.PropTypes.func.isRequired,
    createLink: React.PropTypes.func.isRequired,
    stopLink: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.updatePortPos = this.updatePortPos.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  updatePortPos(element) {
    const { name, type, nodeId, setPortPos } = this.props
    const { top, bottom, left, right } = element.getBoundingClientRect()
    setPortPos(
      nodeId,
      type === 'in' ? 'inPorts' : 'outPorts',
      name,
      [(left + right) / 2, (top + bottom) / 2]
    )
  }

  handleMouseUp(event) {
    event.preventDefault()
    event.stopPropagation()
    const { createLink, creatingLinkSrc, nodeId, name, type, stopLink } = this.props
    createLink(creatingLinkSrc, { id: nodeId, port: name, type})
    stopLink()
  }

  handleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    const { creatingLink, startLink, nodeId, name, type } = this.props
    invariant(
      !creatingLink,
      'state.editor.creatingLink should be false when attempting to start link'
    )
    startLink(nodeId, name, type, event.clientX, event.clientY)
  }

  render() {
    const { type, name, nodeId, creatingLink } = this.props
    const isInPort = (type === 'in')
    return (
      <div
        className={style.port}
        onMouseDown={this.handleMouseDown}
        onMouseUp={creatingLink && this.handleMouseUp}>
        <div
          className={isInPort ? style.inPortSquare : style.outPortSquare}
          ref={(e) => { e && this.updatePortPos(e) }}
        />
        <div className={isInPort ? style.inPortName : style.outPortName}>
          {name}
        </div>
      </div>
    )
  }
}

export default Port
