import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import 'components/range-input/range-input.scss'

class RangeInput extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    return (
      <div className={this.getClass()}>
        <input></input>
      </div>
    )
  }

  getClass() {
    return classnames('range-input', this.props.className)
  }
}

export default RangeInput