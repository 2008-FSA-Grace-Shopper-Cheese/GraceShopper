import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCheeses} from '../store/cheeses'
import axios from 'axios'
import {fetchCheeseCart} from '../store/cheeseCart'

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
    if (!localStorage.getItem('cheese'))
      localStorage.setItem('cheese', JSON.stringify(localCart))

    let cheeseId = e.target.value

    if (!this.props.user.id) {
      let selectedCheese = this.props.cheeses.filter(
        cheese => cheese.id === Number(cheeseId)
      )

      localCart = JSON.parse(localStorage.getItem('cheese'))

      //      console.log("localCart.length",localCart.length)
      // console.log("localCart[0]",localCart[0])
      console.log(localStorage)

      let findOrNot = 0
      localCart.map(element => {
        if (element.id == cheeseId) {
          element.quantity++
          findOrNot++
        }
      })
      console.log(findOrNot)
      if (findOrNot === 0) {
        selectedCheese[0].quantity = 1
        localCart.push(selectedCheese[0])
      }
      console.log(localCart)
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
