import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import Popover from 'material-ui/Popover'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import FontIcon from 'material-ui/FontIcon';

import Port from '../Port'
import ConfigSelect from '../ConfigSelect'
import ConfigText from '../ConfigText'
import style from './style.scss'


class NodeElement extends React.Component {

  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    pos: PropTypes.array.isRequired,
    phase: PropTypes.string.isRequired,
    step: PropTypes.string.isRequired,
    outPorts: PropTypes.object.isRequired,
    inPorts: PropTypes.object.isRequired,
    editorOrigin: PropTypes.array.isRequired,
    selectedNodeId: PropTypes.string,
    config: PropTypes.object,
    expanded: PropTypes.bool.isRequired,

    setPortPos: PropTypes.func.isRequired,
    resetPortPos: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
    updateDeltaPos: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { nodeId, resetPortPos } = this.props
    resetPortPos(nodeId)
  }

  render() {
    const {
      nodeId, pos, phase, step, inPorts, outPorts, expanded,
      selected, editorOrigin, selectedNodeId, config,
      handleClose, handleMouseDown, toggleSize
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
          <FontIcon className={iconClass} style={iconStyle} onClick={toggleSize}>
            { expanded ? 'remove_circle_outline' : 'add_circle_outline' }
          </FontIcon>
        </div>
        <div className={style.ports}>
          <div className={style.inPorts}>
            {/*
              1. Pass pos in to force Port rerender when node moves.
              2. Pass expanded in to force Port rerender when it collapses or expands.
            */}
            <Port isInPort={true} name={'in'} nodeId={nodeId} pos={pos} expanded={expanded} />
          </div>
          <div className={style.outPorts}>
            <Port isInPort={false} name={'out'} nodeId={nodeId} pos={pos}expanded={expanded} />
          </div>
        </div>
          {
            expanded && _.toPairs(config).map(([name, args]) => {
              if (['TEXT', 'INTEGER', 'FLOAT'].includes(args.type)) {
                return (
                  <ConfigText name={name} key={name} nodeId={nodeId} />
                )
              } else if (['BOOL', 'SELECT'].includes(args.type)) {
                return (
                  <ConfigSelect name={name} key={name} nodeId={nodeId} />
                )
              }
            })
          }
      </div>
    )
  }
}

export default NodeElement
