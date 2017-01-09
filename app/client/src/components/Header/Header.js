import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

/*
<h1>React Redux Starter Kit Test</h1>
<IndexLink to='/' activeClassName='route--active'>
  Home
</IndexLink>
{' · '}
<Link to='/counter' activeClassName='route--active'>
  Counter
</Link>
*/
export const Header = () => (
   <div className="mdl-layout mdl-js-layout">
    <header className="mdl-layout__header">
      <div className="mdl-layout-icon"></div>
      <div className="mdl-layout__header-row">
        <span className="mdl-layout__title">PUPPETEER</span>
        <div className="mdl-layout-spacer"></div>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="#">Nav link 1</a>
          <a className="mdl-navigation__link" href="#">Nav link 2</a>
          <a className="mdl-navigation__link" href="#">Nav link 3</a>
        </nav>
      </div>
    </header>
    <div className="mdl-layout__drawer">
      <span className="mdl-layout__title">Simple Layout</span>
    </div>
  </div>
)

export default Header
