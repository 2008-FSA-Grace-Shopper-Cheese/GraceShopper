import React from 'react'
import {connect} from 'react-redux'

class Fulfillment extends React.Component {
  constructor() {
    super()
  }
  render() {
    const randomNum = Math.floor(Math.random() * 100000)
    const user = this.props.user
    let cart
    if (this.props.cheeseCart[0]) {
      cart = this.props.cheeseCart[0].cheeses
    }
    return (
      <div>
        <h1>Order #{randomNum}</h1>
        <div>
          Your order has been fulfilled! Check your email for an order
          confirmation.
        </div>
        <div>You ordered:</div>
        <ul>
          {cart.map(cheese => {
            return (
              <li key={cheese.id}>
                {cheese.name} Quantity:
                {cart.reduce((accumulator, elem) => {
                  if (elem.name === cheese.name) {
                    accumulator += elem.CheeseCarts.quantity
                  }
                  return accumulator
                }, 0)}
              </li>
            )
          })}
        </ul>
        <h2>Billing and Shipping Info</h2>
        <div>First Name: {user.firstName}</div>
        <div>Last Name: {user.lastName}</div>
        <div>Address: {user.address}</div>
        <div>Email: {user.email}</div>
        <div>Phone Number: {user.phoneNumber}</div>
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
  return {}
}

export default connect(mapState, mapDispatch)(Fulfillment)
