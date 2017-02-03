import React from 'react'
import cn from 'classnames'

import style from './style.scss'


class Sidebar extends React.Component {
  render() {
    return (
      <div className={style.wrapper}>
        <header className={style.top}>
          <div className={style.dropdown}>
            <span>hello@example.com</span>
            <div className="mdl-layout-spacer"></div>
            <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i className="material-icons" role="presentation">arrow_drop_down</i>
              <span className="visuallyhidden">Accounts</span>
            </button>
            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
              <li className={cn(style.dropdownItem, "mdl-menu__item")}>
                <i className={cn(style.dropdownIcon, "material-icons")}>account_box</i>
                <div className={style.dropdownText}>登录</div>
              </li>
              <li className={cn(style.dropdownItem, "mdl-menu__item")}>
                <i className={cn(style.dropdownIcon, "material-icons")}>exit_to_app</i>
                <div className={style.dropdownText}>注销</div>
              </li>
            </ul>
          </div>
        </header>
        <nav className={cn(style.navigation, "demo-navigation", "mdl-navigation", "mdl-color--blue-grey-800")}>
          <a className={cn(style.navigationLink, "mdl-navigation__link")} href="">
            <i className={cn(style.navigationIcon, "mdl-color-text--blue-grey-400", "material-icons")} role="presentation">home</i>
            Dashboard
          </a>
        </nav>
      </div>
    )
  }
}

export default Sidebar
