import React from 'react'
import { Header } from '../../../../components/Header'
import { HomeView } from '../HomeView'
import './style.scss'
import '../../../../styles/core.scss'


class HomeLayout extends React.Component {

  render() {
    return (
      <div className='container text-center' style={{ height: '100%' }}>
        <Header />
        <aside className='mdl-components__nav docs-text-styling mdl-shadow--4dp' style={{ width: '200px', 'height': '100%', float: 'left'}}>
          <a className='mdl-components__link mdl-component badges' href='#'>
            test
          </a>
        </aside>
        <div className='core-layout__viewport' style={{ height: '100%' }}>
          <HomeView />
        </div>
      </div>
    )
  }
}

export default HomeLayout
