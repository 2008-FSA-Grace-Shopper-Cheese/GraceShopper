import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchCheeses} from '../store/cheeses'
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    this.props.getAllCheeses()
  }

  render() {
    const cheeses = this.props.allCheeses
    const {userName} = this.props
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
    let todayPrimeIndex = cheeses.length % ((todayIndex + 1) * 31)
    let todayPrime = cheeses[todayPrimeIndex]

    return (
      <div>
        <h3>Welcome, {userName ? userName : 'Guest'}</h3>
        <h4>{today}'s Optmize Prime For You:</h4>
        {todayPrime.imageUrl}
        {todayPrime.name}
        {todayPrime.price}
        {todayPrime.description}
        <hr />
        <NavLink to="/cheeses">
          <h5>See More Cheeses</h5>
        </NavLink>
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
    userName: state.user.userName,
    allCheeses: state.cheeses
  }
}

const mapProps = dispatch => {
  return {
    getAllCheeses: dispatch(fetchCheeses())
  }
}

export default connect(mapState, mapProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
