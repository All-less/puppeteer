import React from 'react'
import _ from 'lodash'

import NodeElement from '../NodeElement'
import style from './style.scss'


class NodeLayer extends React.Component {

  static propTypes = {
    nodeMap: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div
        className={style.nodeLayer}
        style={{ width: '100%', height: '100%' }}>
        {
          _.toPairs(this.props.nodeMap).map(([key, value]) => (
            <NodeElement key={key} nodeId={key} {...value} />
          ))
        }
      </div>
    )
  }
}

export default NodeLayer
