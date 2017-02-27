import React from 'react'
import _ from 'lodash'

import style from './style.scss'
import LinkLine from '../LinkLine'
import { computePath } from '../../../../util'


class LinkLayer extends React.Component {

  static propTypes = {
    linkMap: React.PropTypes.object.isRequired
  }

  render() {
    const {
      linkMap, creatingLink, creatingLinkStart,
      creatingLinkEnd, editorOrigin
    } = this.props
    return (
      <svg
        className={style.linkLayer}
        style={{ width: '100%', height: '100%' }}>
        {
          _.toPairs(linkMap).map(([id, link], index) => {
            return (
              <g key={index}>
                {/* <path className={style.mask} d={path}></path> */}
                <LinkLine linkId={id} className={style.link} ></LinkLine>
              </g>
            )
          })
        }
        {
          creatingLink && (
            <g>
              <path className={style.link} d={computePath(
                creatingLinkStart, creatingLinkEnd, editorOrigin
              )} >
              </path>
            </g>
          )
        }
      </svg>
    )
  }
}

export default LinkLayer
