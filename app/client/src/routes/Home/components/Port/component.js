import React from 'react'

import style from './style.scss'


class Port extends React.Component {

  static PropTypes = {
    nodeId: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    // only 'in' and 'out' are allowed
    type: React.PropTypes.string.isRequired,

    setPortPos: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.updatePortPos = this.updatePortPos.bind(this)
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

  render() {
    const { type, name, nodeId } = this.props
    const isInPort = (type === 'in')
    return (
      <div className={style.port}>
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
