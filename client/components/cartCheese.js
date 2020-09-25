import React, {Component} from 'react'
import {deleteCheese, changeQuantity} from '../store/cheeseCart'
import store from '../store'

export default class cartCheese extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange() {
    // access the store and change the quantity inside the items in cart
  }
  handleClick() {
    //using reducer remove item from inside the cart state
    console.log('clicked')
    console.log('this.props.id====', this.props.id)
    store.dispatch(deleteCheese(this.props.id))
  }
  render() {
    const {id, name, image, price, quantity} = this.props
    return (
      <div className="item_in_Checkout">
        <img
          className="checkoutItem_IMG"
          height={100}
          width={100}
          src={image}
        />
        <div className="checkoutItem_info">
          <p className="checkoutItem_Name">{name}</p>
          <p className="checkoutItem_Price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div>
            <select
              name="quantity"
              defaultValue={quantity}
              onClick={this.onClick}
            >
              {/* <option value={quantity} selected disabled hidden>
                {quantity}
              </option> */}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <button type="button" onClick={this.handleClick}>
          Remove from Cart
        </button>
      </div>
    )
  }
}

// const mapDispatch = dispatch => {
//   return {

// edit: () => {
//   dispatch(changeQuantity())
// }  ,

// delete:() => {
//   dispatch(deleteCheese())
// }

//   }
// }

// export default connect(mapDispatch)(cartCheese)
