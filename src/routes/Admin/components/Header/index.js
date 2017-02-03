import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Dashboard</span>
        <div className="mdl-layout-spacer"></div>
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
          <i className="material-icons">more_vert</i>
        </button>
        <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
          <li className="mdl-menu__item">About</li>
        </ul>
      </div>
    )
  }
}

export default Header
