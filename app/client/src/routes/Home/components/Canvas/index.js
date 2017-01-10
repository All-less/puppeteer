import React from 'react'

import { CanvasWidget } from '../Editor'
import Engine from '../Editor/FakeData'
import style from './style.scss'


const Canvas = () => {
  return (
    <div style={{ height: '100%' }}>
      <CanvasWidget engine={Engine} />
    </div>
  )
}

export default Canvas
