import RangeBuilder from 'components/range-builder'
import RangeOutput from 'components/range-output'
import React, { Component } from 'react'

import './home.scss'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <RangeBuilder className="home--range-builder" />
        <RangeOutput className="home--range-output" />
      </div>
    )
  }
}

export default Home

