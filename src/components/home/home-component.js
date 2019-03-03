import BoardInput from 'components/board-input'
import PropTypes from 'prop-types'
import RangeAnalyzer from 'components/range-analyzer'
import RangeBuilder from 'components/range-builder'
import RangeEquities from 'components/range-equities'
import RangeInput from 'components/range-input'
import RangeOutput from 'components/range-output'
import React, {Component} from 'react'

import './home.scss'
import 'typeface-roboto'


class Home extends Component {
  constructor(props) {
    super(props)

    this.renderRange = this.renderRange.bind(this)
  }

  static propTypes = {
    ranges: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      selectedComboIds: PropTypes.arrayOf(PropTypes.string)
    })).isRequired
  }

  render() {
    return (
      <div className="home">
        <RangeBuilder className="home--range-builder" />
        <div className="home--range-info"> 
          <RangeAnalyzer />
          {this.renderRanges()}
          <RangeInput className="home--range-input"/>
          <BoardInput />
          {this.renderRangeEquities()}
        </div>
      </div>
    )
  }

  renderRanges() {
    return this.props.ranges.map(this.renderRange)
  }

  renderRange(range) {
    return <RangeOutput {...this.getRangeOutputProps(range)} />
  }

  renderRangeEquities() {
    return (
      <div className="home--range-equities">
        <h2>Equity</h2>
        <RangeEquities />
      </div>
    )
  }

  getRangeOutputProps(range) {
    return {
      color: range.color,
      name: range.name,
      key: range.name
    }
  }
}

export default Home
