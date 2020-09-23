import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCheese} from '../store/singleCheese'

class SingleCheese extends React.Component {
  componentDidMount() {
    this.props.getSingleCheese(this.props.match.params.cheeseId)
  }

  render() {
    const cheese = this.props.cheese

    return (
      <div>
        <img width={500} height={500} src={cheese.imageUrl} />
        <h2>{cheese.name}</h2>
        <p> Description: {cheese.description}</p>
        <p>
          Price:<small>$</small> <strong> {cheese.price}</strong>
        </p>
        <button type="button">Add to Cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cheese: state.singleCheeseReducer.cheese
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCheese: cheeseId => dispatch(fetchSingleCheese(cheeseId))
  }
}

export default connect(mapState, mapDispatch)(SingleCheese)
