import React from 'react'
import {connect} from 'react-redux'

class Fulfillment extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.setState({
        cart: this.props.cheeseCart[0].cheeses
      })
    }
  }
  render() {
    const randomNum = Math.floor(Math.random() * 100000)
    let user
    let cart
    if (this.props.user.id) {
      user = this.props.user
      cart = this.state.cart
    } else {
      cart = JSON.parse(localStorage.getItem('cheese'))
      user = JSON.parse(localStorage.getItem('guestInfo'))
    }
    return (
      <div>
        <h1>Order #{randomNum}</h1>
        <div>
          Your order has been fulfilled! Check your email for an order
          confirmation.
        </div>
        <div>You ordered:</div>

        {this.props.user.id
          ? cart.map(cheese => {
              return (
                <ul key={cheese.id}>
                  <li>
                    {cheese.name} Quantity:
                    {cart.reduce((accumulator, elem) => {
                      if (elem.name === cheese.name) {
                        accumulator += elem.CheeseCarts.quantity
                      }
                      return accumulator
                    }, 0)}
                  </li>
                </ul>
              )
            })
          : cart.map(cheese => {
              return (
                <ul key={cheese.id}>
                  <li>
                    {cheese.name} Quantity:
                    {cheese.quantity}
                  </li>
                </ul>
              )
            })}

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
