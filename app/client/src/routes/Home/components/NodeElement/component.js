import React from 'react'
import cn from 'classnames'

import Port from '../Port'
import style from './style.scss'


class NodeElement extends React.Component {

  static propTypes = {
    nodeId: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired,
    pos: React.PropTypes.array.isRequired,
    type: React.PropTypes.string.isRequired,
    outPorts: React.PropTypes.object.isRequired,
    inPorts: React.PropTypes.object.isRequired,

    setPortPos: React.PropTypes.func.isRequired,
    resetPortPos: React.PropTypes.func.isRequired,
    switchSelect: React.PropTypes.func.isRequired,
    moveNode: React.PropTypes.func.isRequired
  }

  state = {
    originX: 0,
    originY: 0
  }

  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseMove(event) {
    event.preventDefault()
    const { nodeId, moveNode } = this.props
    const { originX, originY } = this.state
    moveNode(nodeId, event.clientX - originX, event.clientY - originY)
    this.setState({
      originX: event.clientX,
      originY: event.clientY
    })
  }

  handleMouseUp(event) {
    event.preventDefault()
    const { nodeId, switchSelect } = this.props
    switchSelect(nodeId)
  }

  handleMouseDown(event) {
    event.preventDefault()
    const { nodeId, switchSelect } = this.props
    switchSelect(nodeId)
    this.setState({
      originX: event.clientX,
      originY: event.clientY
    })
  }

  componentWillMount() {
    const { nodeId, resetPortPos } = this.props
    resetPortPos(nodeId)
  }

  render() {
    const { nodeId, pos, type, inPorts, outPorts, selected } = this.props
    const position = [this.state.originX, this.state.originY]
    return (
      <div
        className={cn(style.node, {[style.selected]: selected})}
        style={{left: pos[0], top: pos[1]}}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={selected ? this.handleMouseMove : undefined}>
        <div className={style.title}>{type}</div>
        <div className={style.ports}>
          <div className={style.outPorts}>
            {
              _.toPairs(outPorts).map(([key, value]) => (
                // 'pos' is used to force children re-render
                <Port key={key} type="out" name={key} nodeId={nodeId} pos={position}/>
              ))
            }
          </div>
          <div className={style.inPorts}>
            {
              _.toPairs(inPorts).map(([key, value]) => (
                <Port key={key} type="in" name={key} nodeId={nodeId} pos={position}/>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default NodeElement
