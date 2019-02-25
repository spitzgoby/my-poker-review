import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import "components/range-equities/range-equities.scss"

class RangeEquities extends Component {

  static propTypes = {
    className: PropTypes.string,
    equities: PropTypes.arrayOf(PropTypes.number)
  }

  static defaultProps = {
    equities: [.5, .5]
  }

  render() {
    return (
      <div className={this.getClass()}>
        {this.renderEquities()}
      </div>
    )
  }

  renderEquities() {
    return this.props.equities.map((equity, index) => {
      return <div key={index} className="range-equities--equity">
        {equity * 100 + '%'}
      </div>
    })
  }

  getClass() {
    return classnames('range-equities', this.props.className)
  }
}

export default RangeEquities