import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllCheese extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {}

  render() {
    return <div>hello</div>
  }
}

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect(mapState, mapDispatch)(AllCheese)
