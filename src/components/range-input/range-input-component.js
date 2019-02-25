import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import 'components/range-input/range-input.scss'

class RangeInput extends Component {

  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setPlayerHand: PropTypes.func
    }).isRequired,
    className: PropTypes.string
  }

  render() {
    return (
      <div className={this.getClass()}>
        <input {...this.getInputProps()}></input>
      </div>
    )
  }

  getInputProps() {
    return {
      onChange: this.handleInputChange,
      value: this.props.playerHand
    }
  }

  getClass() {
    return classnames('range-input', this.props.className)
  }

  handleInputChange(event) {
    let setPlayerHand = this.props.actions.setPlayerHand

    if (setPlayerHand) {
      setPlayerHand({ value: event.target.value})
    }
  }
}

export default RangeInput