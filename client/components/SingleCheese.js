import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchSingleCheese} from '../store/singleCheese'
import {fetchCheeseCart} from '../store/cheeseCart'

function ItemName(arr1, arr2) {
  for (let i = 0; i < arr1.length; ++i) {
    let currentEle = arr1[i]
    if (currentEle.name === arr2[0].name) {
      return i
    }
  }
  return -1
}

class SingleCheese extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getSingleCheese(this.props.match.params.cheeseId)
  }

  handleClick(e) {
    let localCart = []
    let cheeseId = e.target.value

    if (!this.props.user.id) {
      let selectedCheese = this.props.cheeses.filter(
        cheese => cheese.id === Number(cheeseId)
      )
      selectedCheese[0].quantity = 1

      if (localStorage.getItem('cheese')) {
        localCart = JSON.parse(localStorage.getItem('cheese'))
      }

      if (ItemName(localCart, selectedCheese) >= 0) {
        let num = ItemName(localCart, selectedCheese)
        localCart[num].quantity += 1
      } else {
        localCart.push(selectedCheese[0])
      }

      localStorage.setItem('cheese', JSON.stringify(localCart))
    } else this.props.addToCart(cheeseId)
  }
  render() {
    const cheese = this.props.cheese

    return (
      <div>
        <img width={500} height={500} src={cheese.imageUrl} />
        <h2>{cheese.name}</h2>
        <p> Description: {cheese.description}</p>
        <p>
          Price:{' '}
          {(cheese.price / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </p>
        <button onClick={this.handleClick} value={cheese.id} type="button">
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cheese: state.singleCheeseReducer.cheese,
    cheeses: state.cheesesReducer.cheeses,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCheese: cheeseId => dispatch(fetchSingleCheese(cheeseId)),
    addToCart: async cheeseId => {
      await axios.post(`/api/cheeseCart/${cheeseId}`)
      dispatch(fetchCheeseCart())
    }
  }
}

export default connect(mapState, mapDispatch)(SingleCheese)
