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
    nodeMap: React.PropTypes.object.isRequired,
    linkMap: React.PropTypes.object.isRequired,
    creatingLink: React.PropTypes.bool.isRequired,

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
      selectedNodeId, updateNodePos, creatingNodeId, creatingLink, updateLinkEnd
    } = this.props
    selectedNodeId && updateNodePos(selectedNodeId, event.clientX, event.clientY)
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
    const { linkMap, nodeMap } = this.props
    let linksToRender = {}
    _.forOwn(linkMap, (link, id) => {
      // check whether positions of endpoints are computed
      const src = nodeMap[link.src.id].outPorts[link.src.port]
      const dst = nodeMap[link.dst.id].inPorts[link.dst.port]
      if (src.computed && dst.computed) {
        linksToRender[id] = { id, src: src.pos, dst: dst.pos }
      }
    })

    return (
      <div
        style={{ height: '100%' }}
        ref={(e) => { e && this.setRelativeOrigin(e) }}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
        <LinkLayer linkMap={linksToRender} style={{ position: 'absolute' }}/>
        <NodeLayer nodeMap={nodeMap} style={{ position: 'absolute' }}/>
      </div>
    )
  }
}

export default Editor
