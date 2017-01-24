import React from 'react'
import _ from 'lodash'

import style from './style.scss'


class LinkLayer extends React.Component {

  static propTypes = {
    linkMap: React.PropTypes.object.isRequired,
    editorOrigin: React.PropTypes.array.isRequired
  }

  render() {
    const { linkMap, editorOrigin } = this.props
    return (
      <svg
        className={style.linkLayer}
        style={{ width: '100%', height: '100%' }}>
        {
          _.toPairs(linkMap).map(([id, link], index) => {
            const sx = link.src[0] - editorOrigin[0]
            const sy = link.src[1] - editorOrigin[1]
            const dx = link.dst[0] - editorOrigin[0]
            const dy = link.dst[1] - editorOrigin[1]
            const path = (sx - dx) * (sx - dx) + (sy - dy) * (sy - dy) > 50 * 50
              ? `M ${sx},${sy} C ${sx + 50},${sy} ${dx - 50},${dy} ${dx},${dy}`
              : `M ${sx},${sy} L ${dx},${dy}`
            return (
              <g key={index}>
                {/* <path className={style.mask} d={path}></path> */}
                <path className={style.link} d={path}></path>
              </g>
            )
          })
        }
      </svg>
    )
  }
}

export default LinkLayer
