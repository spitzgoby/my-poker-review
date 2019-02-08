import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ComboCell extends Component {
  static propTypes = {
    combo: PropTypes.shape({
      suited: PropTypes.bool,
      value: PropTypes.string
    }),
    selected: PropTypes.bool
  }


  render() {
    return (
      <td className={this.getClass()}>
        {this.props.combo.value}
      </td> 
    ) 
  }

  getClass() {
    let {
      selected,
      combo: {
        suited
      }
    } = this.props

    let classes = {
      'combo-cell': true,
      'combo-cell--selected': selected,
      'combo-cell--suited': suited,
      'combo-cell--pair': this.isAPair()
    }

    return classnames(classes)
  }

  isAPair() {
    return this.props.combo.value.charAt(0) === this.props.combo.value.charAt(1)
  }
}

export default ComboCell