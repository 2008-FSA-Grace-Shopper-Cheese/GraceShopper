import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store/user'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      address: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      shippingCost: 'standard',
      creditCard: '',
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.setState({
      email: this.props.user.email,
      loading: false
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
  }
  render() {
    return (
      <div>
        {!this.state.loading ? (
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
                <option value="standard">Standard (5 - 7 days) FREE</option>
                <option value="express">Express (2 - 3 days) $55</option>
                <option value="nextday">Next Day Shipping (1 day) $100</option>
              </select>

              <label htmlFor="creditCard">Credit Card Number:</label>
              <input
                type="text"
                name="creditCard"
                value={this.state.creditCard}
                onChange={this.handleChange}
              />

              <button type="submit">Review Order</button>
            </form>

            <div>
              <h2>Order Summary</h2>
              <div>Items: </div>
              <div>Shipping: </div>
              <div>Estimated tax to be collected: </div>
              <h2>Total: </h2>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (id, newInfo) => dispatch(updateUser(id, newInfo))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
