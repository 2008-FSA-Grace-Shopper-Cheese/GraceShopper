import React from 'react'
import CartCheese from './cartCheese'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchCheeseCart,
  deleteCheese,
  changeQuantity
} from '../store/cheeseCart'

export class shoppingCart extends React.Component {
  componentDidMount() {
    this.props.getCheeseCart()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(id, userId) {
    this.props.destroyCheese(id, userId)
  }
  handleChange(e, id) {
    this.props.editQuantity(e.target.value, id)
    console.log('value', e.target.value, 'cheeseId', id)
  }

  render() {
    let cart
    let userId
    let quantity

    if (this.props.cheeseCart[0]) {
      cart = this.props.cheeseCart[0].cheeses
      userId = this.props.user.id
    } else {
      cart = JSON.parse(localStorage.getItem('cheese'))
      console.log('cart for guest', cart)
    }

    console.log('>>>', this.props)
    return (
      <div>
        {cart ? (
          <div className="shoppingCart">
            <h2>Shopping Cart</h2>
            <div>
              {cart.map(cheese => (
                <CartCheese
                  key={cheese.id}
                  userId={userId}
                  id={cheese.id}
                  name={cheese.name}
                  image={cheese.imageUrl}
                  price={cheese.price}
                  quantity={cheese.CheeseCarts.quantity}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                />
              ))}
            </div>
            <div className="totalAmount" />
            <Link to="/checkout">
              <button type="button">Proceed to Checkout</button>
            </Link>
          </div>
        ) : (
          <p>Shopping Cart is Empty</p>
        )}
      </div>
    )
  }
}
const mapState = state => {
  return {
    cheeseCart: state.cheeseCartReducer.cheeseCart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCheeseCart: () => {
      dispatch(fetchCheeseCart())
    },
    destroyCheese: cheeseId => {
      dispatch(deleteCheese(cheeseId))
    },
    editQuantity: (qty, cheeseId) => {
      dispatch(changeQuantity(qty, cheeseId))
    }
  }
}

export default connect(mapState, mapDispatch)(shoppingCart)
