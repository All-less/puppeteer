import React, { Component } from 'react'

import style from './style.scss'
import ModelSelect from '../ModelSelect'
import ModelEdit from '../ModelEdit'
import ModelTrain from '../ModelTrain'


class StatusPanel extends Component {

  render() {
    return (
      <div className={style.wrapper}>
        <ModelSelect />
        <ModelEdit />
        <ModelTrain />
      </div>
    )
  }
}

export default StatusPanel
