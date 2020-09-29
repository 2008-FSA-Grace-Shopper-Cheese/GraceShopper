import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store/user'
import {
  fetchCheeseCart,
  submitShippingCost,
  checkoutComplete
} from '../store/cheeseCart'
import axios from 'axios'

const shippingObj = {
  1000: 'Standard',
  5000: 'Express',
  10000: 'Next-Day'
}

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      address: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      shippingCost: '1000',
      creditCard: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    if (this.props.userId) {
      this.props.getCheeseCart()
      this.setState({
        email: this.props.user.email,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        phoneNumber: this.props.user.phoneNumber,
        address: this.props.user.address
      })
    }
    const cheeses = JSON.parse(localStorage.getItem('cheese'))
    await axios.post('api/cart/guestCheckout', {cheesecart: cheeses})
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const newInfo = {
      address: this.props.user.address || this.state.address,
      phoneNumber: this.props.user.phoneNumber || this.state.phoneNumber,
      firstName: this.props.user.firstName || this.state.firstName,
      lastName: this.props.user.lastName || this.state.lastName,
      email: this.props.user.email || this.state.email
    }
    if (this.props.user.id) {
      this.props.updateUser(this.props.user.id, newInfo)
      const shippingCost = Number(this.state.shippingCost)

      this.props.submitShippingCost(this.props.cheeseCart[0].id, shippingCost)

      this.props.checkoutComplete(
        this.props.cheeseCart[0].cheeses[0].CheeseCarts.cartId
      )
    } else {
      localStorage.setItem('guestInfo', JSON.stringify(newInfo))
    }

    this.props.history.push('/fulfillment')
  }
  render() {
    let cart
    let totalPrice
    let tax
    let quantity
    if (this.props.user.id) {
      cart = this.props.cheeseCart[0].cheeses

      quantity = cart.reduce((accumulator, elem) => {
        return accumulator + elem.CheeseCarts.quantity
      }, 0)

      totalPrice = this.props.cheeseCart[0].cheeses.reduce(
        (accumulator, elem) => {
          return accumulator + elem.price * elem.CheeseCarts.quantity
        },
        0
      )
    } else {
      let storageProducts = JSON.parse(localStorage.getItem('cheese'))

      cart = storageProducts

      quantity = cart.reduce((accumulator, elem) => {
        return accumulator + elem.quantity
      }, 0)

      totalPrice = cart.reduce((accumulator, elem) => {
        return accumulator + elem.price * elem.quantity
      }, 0)
    }

    tax = totalPrice * 0.08875

    return (
      <div>
        {totalPrice ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={this.props.user.firstName || this.state.firstName}
                onChange={this.handleChange}
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={this.props.user.lastName || this.state.lastName}
                onChange={this.handleChange}
              />

              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={this.props.user.address || this.state.address}
                onChange={this.handleChange}
              />

              <label htmlFor="phoneNumber">Phone:</label>
              <input
                type="text"
                name="phoneNumber"
                value={this.props.user.phoneNumber || this.state.phoneNumber}
                onChange={this.handleChange}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={this.props.user.email || this.state.email}
                onChange={this.handleChange}
              />

              <label htmlFor="shippingCost">Choose your shipping:</label>
              <select
                name="shippingCost"
                value={this.state.shippingCost}
                onChange={this.handleChange}
              >
                <option value="1000">Standard (5 - 7 days) $10</option>
                <option value="5000">Express (2 - 3 days) $50</option>
                <option value="10000">Next Day Shipping (1 day) $100</option>
              </select>

              <label htmlFor="creditCard">Credit Card Number:</label>
              <input
                type="number"
                name="creditCard"
                value={this.state.creditCard}
                onChange={this.handleChange}
              />

              <button type="submit">Submit Order</button>
            </form>

            <div>
              <h2>Order Summary: </h2>
              <div> Items: {quantity}</div>
              <div>Shipping: {shippingObj[this.state.shippingCost]} </div>
              <div>
                Estimated tax to be collected:{' '}
                {(tax / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </div>
              <h2>
                Total:{' '}
                {(
                  (totalPrice + tax + Number(this.state.shippingCost)) /
                  100
                ).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </h2>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cheeseCart: state.cheeseCartReducer.cheeseCart
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (id, newInfo) => dispatch(updateUser(id, newInfo)),
    getCheeseCart: () => dispatch(fetchCheeseCart()),
    submitShippingCost: (cheeseCartId, shippingCost) => {
      dispatch(submitShippingCost(cheeseCartId, shippingCost))
    },

    checkoutComplete: cartId => dispatch(checkoutComplete(cartId))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
