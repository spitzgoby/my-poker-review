import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import 'components/range-output/range-output.scss'

class RangeOutput extends Component {

  constructor(props) {
    super(props)

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
  }

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
        <div className="range-output--label">Range</div>
        <div className="range-output--text"> 
          {this.renderOutput()}
        </div>
        <div>
          <button {...this.getClearButtonProps()}>Clear</button>
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

  getClearButtonProps() {
    return {
      className: 'range-output--clear-button',
      onClick: this.handleClearButtonClick
    }
  }

  getClass() {
    return classnames("range-output", this.props.className)
  }

  handleClearButtonClick() {
    const {clearSelectedComboIds} = this.props.actions

    if (clearSelectedComboIds) {
      clearSelectedComboIds()
    }
  }
}

export default RangeOutput