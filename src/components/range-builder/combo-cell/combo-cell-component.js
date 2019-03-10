import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-builder/combo-cell/styles'

class ComboCell extends Component {

  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      onSelect: PropTypes.func
    }).isRequired,
    color: PropTypes.string,
    combo: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string
    }).isRequired,
    selected: PropTypes.bool
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
      className: this.props.classes.combocell,
      onClick: this.handleSelect
    } 
  }

  handleSelect() {
    const { 
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

export default injectSheet(styles)(ComboCell)