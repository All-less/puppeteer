import React from 'react'
import cn from 'classnames'

import style from './style.scss'
import sourceIcon from './assets/ic_source.png'
import processIcon from './assets/ic_process.png'
import trainIcon from './assets/ic_train.png'
import evaluateIcon from './assets/ic_evaluate.png'


class StepMenu extends React.Component {
  render() {
    const asideClass = cn('mdl-components__nav', 'docs-text-styling', 'mdl-shadow--4dp')
    const itemClass = cn('mdl-components__link', 'mdl-component', style.item)
    const subitemClass = cn('mdl-components__link', 'mdl-component', style.subitem)
    const iconClass = cn('mdl-components__link-image', style.icon)
    const textClass = cn('mdl-components__link-text', style.text)
    return (
      <aside className={asideClass} style={{ 'height': '100%' }}>
        <a className={itemClass} href='#'>
          <img className={iconClass} src={sourceIcon}/>
          <span className={textClass}>选择数据源</span>
        </a>
        <a className={itemClass} href='#'>
          <img className={iconClass} src={processIcon}/>
          <span className={textClass}>数据预处理</span>
        </a>
        <a className={subitemClass} href='#'>
          <span className={textClass}>编辑元数据</span>
        </a>
        <a className={subitemClass} href='#'>
          <span className={textClass}>数据转换</span>
        </a>
        <a className={itemClass} href='#'>
          <img className={iconClass} src={trainIcon}/>
          <span className={textClass}>训练模型</span>
        </a>
        <a className={itemClass} href='#'>
          <img className={iconClass} src={evaluateIcon}/>
          <span className={textClass}>模型评估</span>
        </a>
      </aside>
    )
  }
}

export default StepMenu
