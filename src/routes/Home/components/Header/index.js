import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import cn from 'classnames'

import style from './style.scss'


class Header extends Component {

  render() {
    return (
      <header className={cn('mdl-layout__header', style.wrapper)}>
        <div className='mdl-layout-icon' />
        <div className='mdl-layout__header-row'>
          <div className='mdl-layout-spacer' />
          <span className='mdl-layout__title'>
            <IndexLink to='/' activeClassName={cn('route--active', style.title)}>
              PUPPETEER
            </IndexLink>
          </span>
          <div className='mdl-layout-spacer' />
          <nav className='mdl-navigation'>
            <a className='mdl-navigation__link' href="javascript:void(0)">登录</a>
            <a className='mdl-navigation__link' href="javascript:void(0)">注册</a>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
