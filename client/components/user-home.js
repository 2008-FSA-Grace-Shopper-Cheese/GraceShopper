import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, userName} = props
  var date = new Date()
  var weekday = new Array(7)
  weekday[0] = 'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thursday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'

  var today = weekday[date.getDay()]
  return (
    <div>
      <h3>Welcome, {userName}</h3>
      <h4>{today}'s Optmize Prime For You:</h4>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userName: state.user.userName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
