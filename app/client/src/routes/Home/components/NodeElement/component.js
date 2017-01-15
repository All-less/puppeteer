import React from 'react'
import cn from 'classnames'

import Port from '../Port'
import style from './style.scss'


class NodeElement extends React.Component {

  static propTypes = {
    nodeId: React.PropTypes.string.isRequired,
    pos: React.PropTypes.array.isRequired,
    type: React.PropTypes.string.isRequired,
    outPorts: React.PropTypes.object.isRequired,
    inPorts: React.PropTypes.object.isRequired,
    editorOrigin: React.PropTypes.array.isRequired,
    selectedNodeId: React.PropTypes.string,

    setPortPos: React.PropTypes.func.isRequired,
    resetPortPos: React.PropTypes.func.isRequired,
    setSelected: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    const { nodeId, setSelected } = this.props
    setSelected(nodeId)
  }

  componentWillMount() {
    const { nodeId, resetPortPos } = this.props
    resetPortPos(nodeId)
  }

  render() {
    const { nodeId, pos, type, inPorts, outPorts, selected, editorOrigin, selectedNodeId} = this.props
    return (
      <div
        className={cn(style.node, {[style.selected]: selectedNodeId === nodeId})}
        style={{left: pos[0] - editorOrigin[0], top: pos[1] - editorOrigin[1]}}
        onMouseDown={this.handleMouseDown}>
        <div className={style.title}>{type}</div>
        <div className={style.ports}>
          <div className={style.outPorts}>
            {
              _.toPairs(outPorts).map(([key, value]) => (
                // 'pos' is passed in to force children re-render
                <Port key={key} type="out" name={key} nodeId={nodeId} pos={pos}/>
              ))
            }
          </div>
          <div className={style.inPorts}>
            {
              _.toPairs(inPorts).map(([key, value]) => (
                <Port key={key} type="in" name={key} nodeId={nodeId} pos={pos}/>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default NodeElement
