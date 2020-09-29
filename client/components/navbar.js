import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Life is Gouda</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <Link to="/home">Home</Link>
          <Link to="/cheeses">Cheeses</Link>
          <Link to="/shoppingCart">Shopping Cart</Link>
          <Link to="/support">Support</Link>
          <Link to="/purchaseHistory">Purchase History</Link>
          <Link to="/aboutus">About Us</Link>

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>

          <Link to="/cheeses">Cheeses</Link>
          <Link to="/shoppingcart">Shopping Cart</Link>
          <Link to="/support">Support</Link>

          <Link to="/aboutus">About Us</Link>

          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
