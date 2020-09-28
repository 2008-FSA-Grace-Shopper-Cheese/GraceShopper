import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCheeses} from '../store/cheeses'
import axios from 'axios'
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

class AllCheese extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getCheeses()
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
    return (
      <div>
        {this.props.cheeses ? (
          <div>
            {this.props.cheeses.map(cheese => {
              return (
                <div key={cheese.id}>
                  <img width={100} height={100} src={cheese.imageUrl} />

                  <Link to={`/cheeses/${cheese.id}`}>
                    <div>{cheese.name}</div>
                  </Link>
                  <button
                    onClick={this.handleClick}
                    value={cheese.id}
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <p>No cheese</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cheeses: state.cheesesReducer.cheeses,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCheeses: () => dispatch(fetchCheeses()),
    addToCart: async cheeseId => {
      await axios.post(`/api/cheeseCart/${cheeseId}`)
      dispatch(fetchCheeseCart())
    }
  }
}

export default connect(mapState, mapDispatch)(AllCheese)
