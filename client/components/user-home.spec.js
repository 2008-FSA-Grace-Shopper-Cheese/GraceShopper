/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import CartCheese from './cartCheese'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  xit('renders the email in an h3', () => {
    expect(userHome.find('h5').text()).to.be.equal('See More Cheeses')
  })
})

describe('CartCheese', () => {
  let cartCheese
  beforeEach(() => {
    cartCheese = shallow(
      <CartCheese name="swiss" price="1399" quantity="4" />
    )
  })

  it('renders a id, name, price, quantity', () => {
    expect(cartCheese.find('strong').text()).to.include('1399')
  })
})
