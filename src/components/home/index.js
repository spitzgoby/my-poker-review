import React, { Component } from 'react'
import RangeBuilder from 'components/range-builder'

import './home.css'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <RangeBuilder />
      </div>
    )
  }
}

export default Home

