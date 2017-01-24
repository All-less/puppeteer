import React from 'react'
import { IndexLink, Link } from 'react-router'
import cn from 'classnames'

import style from './style.scss'


const Header = () => {
  return (
    <header className='mdl-layout__header'>
      <div className='mdl-layout-icon' />
      <div className='mdl-layout__header-row'>
        <span className='mdl-layout__title'>
          <IndexLink to='/' activeClassName={cn('route--active', style.title)}>
            PUPPETEER
          </IndexLink>
        </span>
        <div className='mdl-layout-spacer' />
        <nav className='mdl-navigation'>
          <a className='mdl-navigation__link' href='#'>登录</a>
          <a className='mdl-navigation__link' href='#'>注册</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
