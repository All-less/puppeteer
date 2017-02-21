import React from 'react'
import invariant from 'invariant'

import style from './style.scss'


class Port extends React.Component {

  static PropTypes = {
    nodeId: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    // only 'in' and 'out' are allowed
    isInPort: React.PropTypes.bool.isRequired,
    color: React.PropTypes.string.isRequired,
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
    const { name, type, nodeId, setPortPos, isInPort } = this.props
    const { top, bottom, left, right } = element.getBoundingClientRect()
    setPortPos(
      nodeId, isInPort ? 'inPorts' : 'outPorts', name,
      [(left + right) / 2, (top + bottom) / 2]
    )
  }

  handleMouseUp(event) {
    event.preventDefault()
    event.stopPropagation()
    const { createLink, creatingLinkSrc, nodeId, name, isInPort, stopLink } = this.props
    createLink(creatingLinkSrc, { id: nodeId, port: name, type: (isInPort ? 'in' : 'out')})
    stopLink()
  }

  handleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    const { creatingLink, startLink, nodeId, name, isInPort, color } = this.props
    invariant(
      !creatingLink,
      'state.editor.creatingLink should be false when attempting to start link'
    )
    startLink(nodeId, name, (isInPort ? 'in' : 'out') , event.clientX, event.clientY)
  }

  render() {
    const { type, name, nodeId, color, creatingLink, isInPort } = this.props
    return (
      <div
        className={isInPort ? style.inPort : style.outPort}
        onMouseDown={this.handleMouseDown}
        onMouseUp={creatingLink && this.handleMouseUp}
        ref={(e) => { e && this.updatePortPos(e) }}>
        <div
          className={isInPort ? style.inPortSquare : style.outPortSquare}
        />
      </div>
    )
  }
}

export default Port
