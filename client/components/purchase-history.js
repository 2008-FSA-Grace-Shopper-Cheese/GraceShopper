import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getHistoryCart} from '../store/cheeseCart'

class HistoryCart extends React.Component {
  componentDidMount() {
    this.props.fetchHistory()
  }

  render() {
    const carts = this.props.pastCarts

    if (carts.length) console.log(carts[0].cheeses)
    if (!carts.length) return <div>NO PURCHASE HISTORY</div>
    else
      return (
        <div>
          {carts.map((cart, index) => {
            return (
              <div key={index}>
                <h3>
                  {index + 1}: Purchase at: {cart.updatedAt}
                </h3>
                <div>
                  {cart.cheeses.map((cheese, ind) => {
                    return (
                      <div key={ind}>
                        <img width={50} height={50} src={cheese.imageUrl} />
                        Name: {cheese.name} Price: {cheese.price} QTY:{' '}
                        {cheese.CheeseCarts.quantity}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )
  }
}
const mapState = state => {
  return {
    pastCarts: state.cheeseCartReducer.historyCart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchHistory: () => {
      dispatch(getHistoryCart())
    }
  }
}

export default connect(mapState, mapDispatch)(HistoryCart)
