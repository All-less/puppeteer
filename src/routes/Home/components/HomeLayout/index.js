import React from 'react'
import cn from 'classnames'

import Header from '..//Header'
import Editor from '../Editor'
import StepMenu from '../StepMenu'

import style from './style.scss'
import '../../../../styles/core.scss'


class HomeLayout extends React.Component {

  render() {
    return (
      <div className={cn('mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header', style.container)}>
        <Header />
        <main className={cn('mdl-layout__content', style.content)}>
          <div className={cn('core-layout__viewport', 'mdl-grid', 'page-content', style.viewport)}>
            <div className={cn('mdl-cell', 'mdl-cell--2-col', style.part)}>
              <StepMenu />
            </div>
            <div className={cn('mdl-cell', 'mdl-cell--10-col', style.part)}>
              <Editor />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default HomeLayout
