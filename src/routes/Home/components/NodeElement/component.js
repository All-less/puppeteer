import React, { Component } from 'react'
import cn from 'classnames'
import Popover from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import FontIcon from 'material-ui/FontIcon';

import Port from '../Port'
import ConfigField from '../ConfigField'
import style from './style.scss'


class NodeElement extends React.Component {

  static propTypes = {
    nodeId: React.PropTypes.string.isRequired,
    pos: React.PropTypes.array.isRequired,
    phase: React.PropTypes.string.isRequired,
    step: React.PropTypes.string.isRequired,
    outPorts: React.PropTypes.object.isRequired,
    inPorts: React.PropTypes.object.isRequired,
    editorOrigin: React.PropTypes.array.isRequired,
    selectedNodeId: React.PropTypes.string,
    config: React.PropTypes.object,

    setPortPos: React.PropTypes.func.isRequired,
    resetPortPos: React.PropTypes.func.isRequired,
    setSelected: React.PropTypes.func.isRequired,
    updateDeltaPos: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    const { nodeId, resetPortPos } = this.props
    resetPortPos(nodeId)
  }

  render() {
    const {
      nodeId, pos, phase, step, inPorts, outPorts,
      selected, editorOrigin, selectedNodeId, config,
      handleClose, handleMouseDown
    } = this.props
    const nodeClass = cn(style.node, {[style.selected]: selectedNodeId === nodeId})
    const nodeStyle = {left: pos[0] - editorOrigin[0], top: pos[1] - editorOrigin[1]}
    const iconClass = cn("material-icons", style.icon)
    const iconStyle = {fontSize: '16px', color: '#616668'}
    return (
      <div className={nodeClass} style={nodeStyle} onMouseDown={handleMouseDown}>
        <div className={style.titles}>
          <span className={style.title}>{step}</span>
          <FontIcon className={iconClass} style={iconStyle} onClick={handleClose}>
            close
          </FontIcon>
        </div>
        <div className={style.ports}>
          <div className={style.inPorts}>
            <Port isInPort={true} name={"name"} nodeId={nodeId} pos={pos}/>
          </div>
          <div className={style.outPorts}>
            <Port isInPort={false} name={"name"} nodeId={nodeId} pos={pos}/>
          </div>
        </div>
          {
            _.toPairs(config).map(([key, value]) => {
              return (
                <ConfigField name={key} key={key} args={value} />
              )
            })
          }
      </div>
    )
  }
}

export default NodeElement
