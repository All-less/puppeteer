import React from 'react'
import './style.scss'
import { CanvasWidget } from '../Editor'

import Engine from '../Editor/FakeData'

export const HomeView = () => {
  return (
    <div style={{ height: '100%' }}>
      <CanvasWidget engine={Engine} />
    </div>
  )
}
