import React from 'react'
import _ from 'lodash'

import LinkLayer from '../LinkLayer'
import NodeLayer from '../NodeLayer'
import style from './style.scss'


class Editor extends React.Component {

  static propTypes = {
    nodeMap: React.PropTypes.object.isRequired,
    linkMap: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.left = 0
    this.top = 0
    this.setRelativeOrigin = this.setRelativeOrigin.bind(this)
    this.getRelativePos = this.getRelativePos.bind(this)
  }

  getRelativePos(pos) {
    return [
      pos[0] - this.left,
      pos[1] - this.top
    ]
  }

  setRelativeOrigin(element) {
    const { left, top } = element.getBoundingClientRect()
    this.left = left
    this.top = top
  }

  render() {
    const { linkMap, nodeMap } = this.props
    let linksToRender = {}
    _.forOwn(linkMap, (link, id) => {
      // check whether positions of endpoints are computed
      const src = nodeMap[link.src.id].outPorts[link.src.port]
      const dst = nodeMap[link.dst.id].inPorts[link.dst.port]
      if (src.computed && dst.computed) {
        linksToRender[id] = {
          id,
          src: this.getRelativePos(src.pos),
          dst: this.getRelativePos(dst.pos)
        }
      }
    })

    return (
      <div
        style={{ height: '100%' }}
        ref={(e) => { e && this.setRelativeOrigin(e) }}>
        <LinkLayer linkMap={linksToRender} style={{ position: 'absolute' }}/>
        <NodeLayer nodeMap={nodeMap} style={{ position: 'absolute' }}/>
      </div>
    )
  }
}

export default Editor
