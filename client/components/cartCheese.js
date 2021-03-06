import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class cartCheese extends Component {
  render() {
    const {
      id,
      name,
      image,
      price,
      quantity,
      handleClick,
      handleChange
    } = this.props

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
            {(price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </p>
          <div>
            <select
              name="quantity"
              defaultValue={quantity}
              onChange={e => handleChange(e, id)}
            >
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
        <button type="button" value={id} onClick={handleClick}>
          Remove from Cart
        </button>
      </div>
    )
  }
}
cartCheese.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.string
}
