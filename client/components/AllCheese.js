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
    let cheeseId = e.target.value

    if (!this.props.user.id) {
      let selectedCheese = this.props.cheeses.filter(
        cheese => cheese.id === Number(cheeseId)
      )
      if (localStorage.getItem('cheese')) {
        localCart = JSON.parse(localStorage.getItem('cheese'))
      }
      localCart.push(selectedCheese[0])
      console.log('local', localCart)

      localStorage.setItem('cheese', JSON.stringify(localCart))
      console.log('allcheese after local storage', localStorage)
    } else this.props.addToCart(cheeseId)
  }

  render() {
    // console.log('allcheese before local storage', localStorage)
    // localStorage.setItem('cheese', JSON.stringify(this.props.cheeses[1]))
    // console.log('allcheese after local storage', localStorage)
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
