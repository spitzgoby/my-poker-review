import Button from '@material-ui/core/Button'
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
    equities: PropTypes.shape({
      win: PropTypes.number,
      lose: PropTypes.number,
      tie: PropTypes.number
    })
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
        <Button {...this.getCalculateButtonProps()}>Calculate</Button>
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

  getCalculateButtonProps() {
    return {
      color: 'primary',
      onClick: this.handleCalculateButtonClick,
      variant: 'contained'
    }
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