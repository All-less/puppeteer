import React, { Component, PropTypes } from 'react'

import style from './style.scss'
import { computePath } from '../../../../util'

class LinkLine extends Component {
  render() {
    if (this.props.computed) {
      const { src, dst, editorOrigin } = this.props
      return (
        <path
          className={style.link}
          d={computePath(src, dst, editorOrigin)}
        ></path>
      )
    } else {
      return null
    }
  }
}

export default LinkLine
