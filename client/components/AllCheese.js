import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCheeses} from '../store/cheeses'

class AllCheese extends React.Component {
  // constructor() {
  //   super()
  // }
  componentDidMount() {
    this.props.getCheeses()
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
                  <button type="button">Add to Cart</button>
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
    getCheeses: () => dispatch(fetchCheeses())
  }
}

export default connect(mapState, mapDispatch)(AllCheese)
