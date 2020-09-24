import React from 'react'
import {connect} from 'react-redux'

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
      creditCard: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    console.log(this.props.user)
    this.setState({
      email: this.props.user.email
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {}
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" value={this.state.firstName} />

          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" value={this.state.lastName} />

          <label htmlFor="address">Address:</label>
          <input type="text" name="address" value={this.state.address} />

          <label htmlFor="phoneNumber">Phone:</label>
          <input
            type="text"
            name="phoneNumber"
            value={this.state.phoneNumber}
          />

          <label htmlFor="email">Email:</label>
          <input type="text" name="email" value={this.state.email} />

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
          <input type="text" name="creditCard" value={this.state.creditCard} />

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
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Checkout)
