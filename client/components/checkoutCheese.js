import {InputLabel} from '@material-ui/core'
import {MenuItem} from 'material-ui'
import React, {Component} from 'react'

export default class CheckOoutCheese extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange() {
    
  }
  handleClick() {
    
  }
  render() {
    const {id, name, image, price, quantity} = this.props
    return (
      <div className="item_in_Checkout">
        <img className="checkoutItem_IMG" src={image} />
        <div className="checkoutItem_info">
          <p className="checkoutItem_Name">{name}</p>
          <p className="checkoutItem_Price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <InputLabel id="label">Quantity</InputLabel>
          <select
            labelId="label"
            id="select"
            value={quantity}
            onChange={this.handleChange}
          >
            {/* define a onchange */}
            <MenuItem value="1"> 1 </MenuItem>
            <MenuItem value="2"> 2 </MenuItem>
            <MenuItem value="3"> 3 </MenuItem>
            <MenuItem value="4"> 4 </MenuItem>
            <MenuItem value="5"> 5 </MenuItem>
            <MenuItem value="6"> 6 </MenuItem>
            <MenuItem value="7"> 7 </MenuItem>
            <MenuItem value="8"> 8 </MenuItem>
            <MenuItem value="9"> 9 </MenuItem>
            <MenuItem value="10"> 10 </MenuItem>
          </select>
        </div>
        <button onClick={this.handleClick}>Remove from Cart</button>
      </div>
    )
  }
}
