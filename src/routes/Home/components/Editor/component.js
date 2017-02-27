import React from 'react'
import _ from 'lodash'

import LinkLayer from '../LinkLayer'
import NodeLayer from '../NodeLayer'
import style from './style.scss'


class Editor extends React.Component {

  static propTypes = {
    origin: React.PropTypes.array.isRequired,
    selectedNodeId: React.PropTypes.string,
    creatingNodeId: React.PropTypes.string,
    creatingLink: React.PropTypes.bool.isRequired,
    deltaPos: React.PropTypes.array.isRequired,

    updateOrigin: React.PropTypes.func.isRequired,
    setSelected: React.PropTypes.func.isRequired,
    setCreating: React.PropTypes.func.isRequired,
    updateNodePos: React.PropTypes.func.isRequired,
    updateLinkEnd: React.PropTypes.func.isRequired,
    stopLink: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.setRelativeOrigin = this.setRelativeOrigin.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  setRelativeOrigin(element) {
    const { left, top } = element.getBoundingClientRect()
    this.props.updateOrigin(left, top)
  }

  handleMouseMove(event) {
    event.preventDefault()
    const {
      selectedNodeId, updateNodePos, creatingNodeId, creatingLink, updateLinkEnd,
      deltaPos
    } = this.props
    selectedNodeId && updateNodePos(selectedNodeId, event.clientX - deltaPos[0], event.clientY - deltaPos[1])
    creatingNodeId && updateNodePos(creatingNodeId, event.clientX, event.clientY)
    creatingLink && updateLinkEnd(event.clientX, event.clientY)
  }

  handleMouseUp(event) {
    event.preventDefault()
    const { setCreating, setSelected, stopLink, creatingLink } = this.props
    setSelected(null)
    setCreating(null)
    creatingLink && stopLink()
  }

  render() {
    return (
      <div
        style={{ height: '100%', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)' }}
        ref={(e) => { e && this.setRelativeOrigin(e) }}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
        <LinkLayer style={{ position: 'absolute' }}/>
        <NodeLayer style={{ position: 'absolute' }}/>
      </div>
    )
  }
}

export default Editor
