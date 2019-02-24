import RangeBuilder from 'components/range-builder'
import RangeInput from 'components/range-input'
import RangeOutput from 'components/range-output'
import React, { Component } from 'react'

import './home.scss'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <RangeBuilder className="home--range-builder" />
        <div className="home--range-info"> 
          <RangeOutput />
          <RangeInput />
        </div>
      </div>
    )
  }
}

export default Home

