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
  constructor() {
    super()
    this.state = {
      rerender: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getCheeseCart()
  }
  handleClick(e) {
    let CheeseId = e.target.value
    if (this.props.user.id) {
      this.props.destroyCheese(CheeseId)
    } else {
      let storageProducts = JSON.parse(localStorage.getItem('cheese'))
      let products = storageProducts.filter(
        cheese => cheese.id !== Number(CheeseId)
      )
      localStorage.setItem('cheese', JSON.stringify(products))
      this.setState({rerender: !this.state.rerender})
    }
  }
  handleChange(e, id) {
    if (this.props.user.id) {
      this.props.editQuantity(e.target.value, id)
    }
  }

  render() {
    let cart
    let userId
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
                  id={cheese.id}
                  name={cheese.name}
                  image={cheese.imageUrl}
                  price={cheese.price}
                  quantity={
                    cheese.CheeseCarts
                      ? cheese.CheeseCarts.quantity
                      : cheese.quantity
                  }
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
