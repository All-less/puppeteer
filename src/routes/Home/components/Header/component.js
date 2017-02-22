import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import cn from 'classnames'

import style from './style.scss'
import palette from '../../styles/palette'


const linkProps = {
  className: 'mdl-navigation__link',
  style: { color: palette.accentTextColor },
  href: 'javascript:void(0)'
}
const spanProps = {
  className: 'mdl-navigation__link',
  style: { color: palette.textColor }
}

class Header extends Component {

  render() {
    const {
      handleSignin, handleSignup, handleLogout, username
    } = this.props
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
            {
              username
                ? [
                  <span {...spanProps} >{`${username} 欢迎您`}</span>,
                  <a {...linkProps} onClick={handleLogout} >注销</a>
                ] : [
                  <a {...linkProps} onClick={handleSignin} >登录</a>,
                  <a {...linkProps} onClick={handleSignup} >注册</a>
                ]
            }
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
