import BoardInput from 'components/board-input'
import RangeBuilder from 'components/range-builder'
import RangeEquities from 'components/range-equities'
import RangeInput from 'components/range-input'
import RangeOutput from 'components/range-output'
import React, { Component } from 'react'

import './home.scss'
import 'typeface-roboto'


class Home extends Component {
  render() {
    return (
      <div className="home">
        <RangeBuilder className="home--range-builder" />
        <div className="home--range-info"> 
          {this.renderRangeOuput()}
          <RangeInput className="home--range-input"/>
          <BoardInput className="home--board-input"/>
          {this.renderRangeEquities()}
        </div>
      </div>
    )
  }

  renderRangeOuput() {
    return (
      <div>
        <h2>Opponent's Range</h2>
        <RangeOutput />
      </div>
    )
  }

  renderRangeEquities() {
    return (
      <div className="home--range-equities">
        <h2>Equity</h2>
        <RangeEquities />
      </div>
    )
  }
}

export default Home

