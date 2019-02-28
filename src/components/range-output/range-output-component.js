import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import 'components/range-output/range-output.scss'

class RangeOutput extends Component {

  static propTypes = {
    actions: PropTypes.shape({
      clearSelectedComboIds: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    rangeOutput: PropTypes.string
  }

  render() {
    return (
      <div className={this.getClass()}>
        <div className="range-output--text"> 
          {this.renderOutput()}
        </div>
      </div>
    )
  }

  renderOutput() {
    let output = this.props.rangeOutput

    if (!output) {
      output = "Select combos to build a range"
    }

    return output
  }

  getClass() {
    return classnames("range-output", this.props.className)
  }
}

export default RangeOutput