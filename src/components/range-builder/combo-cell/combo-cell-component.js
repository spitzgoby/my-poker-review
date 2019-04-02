import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-builder/combo-cell/combo-cell-styles'

class ComboCell extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
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

  static dragImage = document.createElement('span')

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
      draggable: true,
      ref: this.props.selectableRef,
      onClick: this.handleClick,
      onDragEnter: this.handleDragEnter,
      onDragStart: this.handleDragStart,
    } 
  }

  handleClick() {
    this.handleSelect()
  }

  handleDragEnter() {
    this.handleSelect()
  }

  handleDragStart(event) {
    const dataTransfer = event.dataTransfer

    if (dataTransfer) {
      dataTransfer.setData('text/plain', '')
      dataTransfer.setDragImage(ComboCell.dragImage, 0, 0)
    }
  }

  handleSelect() {
    const {
      actions: {
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