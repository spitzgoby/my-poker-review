import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './combo-cell.scss'

class ComboCell extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      onSelect: PropTypes.func
    }).isRequired,
    combo: PropTypes.shape({
      suited: PropTypes.bool,
      value: PropTypes.string
    }),
    selected: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }


  render() {
    return (
      <td {...this.getProps()}>
        {this.props.combo.text}
      </td> 
    ) 
  }

  getProps() {
    return {
      className: this.getClass(),
      onClick: this.handleSelect
    } 
  }

  getClass() {
    let {
      selected,
      combo: {
        suited,
        pair
      }
    } = this.props

    let classes = {
      'combo-cell': true,
      'combo-cell--selected': selected,
      'combo-cell--suited': suited,
      'combo-cell--pair': pair
    }

    return classnames(classes)
  }

  handleSelect() {
    let { 
      actions :{
        selectCombo 
      },
      combo
    } = this.props

    if (selectCombo) {
      selectCombo({id: combo.id})
    } 
  }
}

export default ComboCell