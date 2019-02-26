import Button from 'components/common/button'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import "components/range-equities/range-equities.scss"

class RangeEquities extends Component {

  constructor(props) {
    super(props)

    this.handleCalculateButtonClick = this.handleCalculateButtonClick.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      calculateEquities: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    equities: PropTypes.arrayOf(PropTypes.number)
  }

  static defaultProps = {
    equities: {
      win: 0.5,
      lose: 0.5,
      tie: 0.0,
    }
  }

  render() {
    return (
      <div className={this.getClass()}>
        <Button onClick={this.handleCalculateButtonClick}>Calculate</Button>
        {this.renderEquities()}
      </div>
    )
  }

  renderEquities() {
    const equities = this.props.equities

    return (
      <div>
        {this.renderEquity(equities, 'win')}
        {this.renderEquity(equities, 'lose')}
        {this.renderEquity(equities, 'tie')}
      </div>
    )
  }

  renderEquity(equities, name) {
    return (
      <div className="range-equities--equity">
        {name}: {this.renderEquityPercentage(equities[name])}
      </div>
    )
  }

  renderEquityPercentage(equity) {
    let result = null

    if (equity) {
      result = equity + '%'
    }

    return result
  }

  getClass() {
    return classnames('range-equities', this.props.className)
  }

  handleCalculateButtonClick() {
    const {
      actions: {
        calculateEquities
      }
    } = this.props

    if (calculateEquities) {
      calculateEquities()
    }
  }
}

export default RangeEquities