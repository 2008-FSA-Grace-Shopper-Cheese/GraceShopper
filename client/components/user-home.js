import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchCheeses} from '../store/cheeses'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getCheeses()
  }

  render() {
    const cheeses = this.props.allCheeses
    const {email, userName} = this.props
    var date = new Date()
    var weekday = new Array(7)
    weekday[0] = 'Sunday'
    weekday[1] = 'Monday'
    weekday[2] = 'Tuesday'
    weekday[3] = 'Wednesday'
    weekday[4] = 'Thursday'
    weekday[5] = 'Friday'
    weekday[6] = 'Saturday'
    const todayIndex = date.getDay()
    var today = weekday[todayIndex]

    //easy hash
    let todayPrimeIndex = (cheeses.length - 1) % (todayIndex + 1)
    let todayPrime = cheeses[todayPrimeIndex]
    return (
      <div>
        {cheeses[0] ? (
          <div>
            <h3>Welcome, {email ? email : 'Guest'}</h3>
            <h4>{today}'s Optmize Prime For You:</h4>
            <img width={500} height={500} src={todayPrime.imageUrl} />
            <h2>{todayPrime.name}</h2>
            <p> Description: {todayPrime.description}</p>
            <p>
              Price:<small>$</small> <strong> {todayPrime.price}</strong>
            </p>

            <hr />
            <NavLink to="/cheeses">
              <h5>See More Cheeses</h5>
            </NavLink>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id,
    allCheeses: state.cheesesReducer.cheeses
  }
}

const mapProps = dispatch => {
  return {
    getCheeses: () => dispatch(fetchCheeses())
  }
}

export default connect(mapState, mapProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
