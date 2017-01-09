import React from 'react'
import { IndexLink, Link } from 'react-router'
import './style.scss'

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
export const Header = () => {
  return (
    <div className='mdl-layout mdl-js-layout'>
      <header className='mdl-layout__header'>
        <div className='mdl-layout-icon' />
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout__title'>
            <IndexLink to='/' activeClassName='route--active'>
              PUPPETEER
            </IndexLink>
          </span>
          <div className='mdl-layout-spacer' />
          <nav className='mdl-navigation'>
            <a className='mdl-navigation__link' href='#'>Nav link 1</a>
            <a className='mdl-navigation__link' href='#'>Nav link 2</a>
            <a className='mdl-navigation__link' href='#'>Nav link 3</a>
          </nav>
        </div>
      </header>
    </div>
  )
}
