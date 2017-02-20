import React from 'react'
import cn from 'classnames'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from '..//Header'
import Editor from '../Editor'
import StepMenu from '../StepMenu'
import StatusPanel from '../StatusPanel'

import style from './style.scss'


class HomeLayout extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className={cn('mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header', style.container)}>
          <Header />
          <main className={cn('mdl-layout__content', style.content)}>
            <div className={cn('core-layout__viewport', 'mdl-grid', 'page-content', style.viewport)}>
              <div className={cn('mdl-cell', 'mdl-cell--2-col', style.part)}>
                <StepMenu />
              </div>
              <div className={cn('mdl-cell', 'mdl-cell--8-col', style.part)}>
                <Editor />
              </div>
              <div
                className={cn('mdl-cell', 'mdl-cell--2-col', style.part)}
                style={{width: 'calc(16.666667% + 16px)' /* overwrite silly margin */}}
                >
                <StatusPanel />
              </div>
            </div>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default HomeLayout
