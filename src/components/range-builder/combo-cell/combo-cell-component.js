import classnames from 'classnames'
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
    comboGroup: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      type: PropTypes.string
    }).isRequired,
    lastRow: PropTypes.bool,
    selected: PropTypes.bool
  }

  render() {


    return (
      <div {...this.getProps()}>
        {this.props.comboGroup.text}
      </div> 
    ) 
  }

  getProps() {
    return {
      className: this.getClass(),
      onClick: this.handleSelect
    } 
  }

  getClass() {
    const {
      classes,
      lastRow
    } = this.props

    return classnames(classes.combocell, {[classes.lastrow]: lastRow})
  }

  handleSelect() {
    const { 
      actions :{
        onSelect
      },
      comboGroup
    } = this.props

    if (onSelect) {
      onSelect({combos: comboGroup.combos})
    } 
  }
}

export default injectSheet(styles)(ComboCell)