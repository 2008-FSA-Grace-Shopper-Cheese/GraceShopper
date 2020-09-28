import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store/user'
import {
  fetchCheeseCart,
  submitShippingCost,
  completeCheckout
} from '../store/cheeseCart'

const shippingObj = {
  '1000': 'Standard',
  '5000': 'Express',
  '10000': 'Next-Day'
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
  componentDidMount() {
    this.props.getCheeseCart()
    console.log('this.props in check out ===', this.props)
    this.setState({
      email: this.props.user.email
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const newInfo = {
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    this.props.updateUser(this.props.user.id, newInfo)
    const shippingCost = Number(this.state.shippingCost)

    this.props.submitShippingCost(this.props.cheeseCart[0].id, shippingCost)

    this.props.completeCheckout()
  }
  render() {
    let cart
    let totalPrice
    let tax
    if (this.props.cheeseCart[0]) {
      cart = this.props.cheeseCart[0].cheeses
      totalPrice =
        this.props.cheeseCart[0].cheeses.reduce((accumulator, elem) => {
          return accumulator + elem.price * elem.CheeseCarts.quantity
        }, 0) / 100

      tax = Math.floor(totalPrice * 0.08875) / 100
    }

    return (
      <div>
        {this.props.cheeseCart[0] ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />

              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />

              <label htmlFor="phoneNumber">Phone:</label>
              <input
                type="text"
                name="phoneNumber"
                value={this.state.phoneNumber}
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
                type="text"
                name="creditCard"
                value={this.state.creditCard}
                onChange={this.handleChange}
              />

              <button type="submit">Submit Order</button>
            </form>

            <div>
              <h2>Order Summary: </h2>
              <div>
                {' '}
                Items:
                {cart.reduce((accumulator, elem) => {
                  return accumulator + elem.CheeseCarts.quantity
                }, 0)}
              </div>
              <div>Shipping: {shippingObj[this.state.shippingCost]} </div>
              <div>Estimated tax to be collected: {tax}</div>
              <h2>Total: {Math.floor((totalPrice + tax) * 100) / 100}</h2>
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
    completeCheckout: () => dispatch(completeCheckout())
  }
}

export default connect(mapState, mapDispatch)(Checkout)
