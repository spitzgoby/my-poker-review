import {createSelectable} from 'react-selectable-fast'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-builder/combo-cell/combo-cell-styles'

class ComboCell extends Component {
  
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
      className: this.props.classes.combocell,
      ref: this.props.selectableRef,
      onClick: this.handleSelect
    } 
  }
}

export default createSelectable(injectSheet(styles)(ComboCell))