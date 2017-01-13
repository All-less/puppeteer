import React from 'react'
import { Header } from 'components/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  /*
  it('Renders a title', () => {
    const title = _wrapper.find('span')
    expect(title).to.exist
    expect(title.first().text()).to.match(/PUPPETEER/)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Home route', () => {
      expect(_wrapper.contains(
        <IndexLink activeClassName='route--active' to='/'>
          Home
        </IndexLink>
      )).to.be.true
    })

    it('Should render a Link to Counter route', () => {
      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/counter'>
          Counter
        </Link>
      )).to.be.true
    })
  })
  */
})
