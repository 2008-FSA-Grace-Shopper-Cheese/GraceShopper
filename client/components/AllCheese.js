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
    let cheeseId = e.target.value
    this.props.addToCart(cheeseId)
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
  return {cheeses: state.cheesesReducer.cheeses}
}

const mapDispatch = dispatch => {
  return {
    getCheeses: () => dispatch(fetchCheeses()),
    addToCart: async cheeseId => {
      const res = await axios.get('/auth/me')
      const id = res.data.id
//       console.log('now id is', id)
//       if (!id) {
//         sessionStorage.guestCart = {cheese1: 222}
//       }
//       console.log('sessionStorage.guestCart is', sessionStorage.guestCart)
      await axios.post(`/api/cheeseCart/${id}/${cheeseId}`)
      dispatch(fetchCheeseCart())
    }
  }
}

export default connect(mapState, mapDispatch)(AllCheese)
