import React from 'react'
import cn from 'classnames'

import style from './style.scss'
import StepMenuItem from '../StepMenuItem'


const asideClass = cn('mdl-components__nav', style.wrapper)

class StepMenu extends React.Component {

  render() {
    const { items, handleMouseMove, handleMouseUp } = this.props
    return (
      <aside
        className={asideClass} onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        >
        {
          items.map((item, index) => (
            <StepMenuItem {...item} phase={item.name} key={index} index={index}/>
          ))
        }
      </aside>
    )
  }
}

export default StepMenu
