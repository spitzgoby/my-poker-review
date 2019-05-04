import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-builder/combo-cell/styles'

class ComboCell extends Component {

  constructor(props) {
    super(props)

    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }
  
  static propTypes = {
    actions: PropTypes.shape({
      onChangeSelecting: PropTypes.func,
      onSelect: PropTypes.func
    }).isRequired,
    color: PropTypes.string,
    comboGroup: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      type: PropTypes.string
    }).isRequired,
    lastRow: PropTypes.bool,
    selected: PropTypes.bool,
    selecting: PropTypes.bool
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
      onDragEnter: this.handleDragEnter,
      onDragStart: this.handleDragStart,
      onMouseDown: this.handleMouseDown
    } 
  }

  handleDragEnter() {
    this.handleSelect(this.props.selecting)
  }

  handleDragStart(event) {
    const dataTransfer = event.dataTransfer

    if (dataTransfer) {
      dataTransfer.setData('text/plain', '')
      dataTransfer.setDragImage(ComboCell.dragImage, 0, 0)
    }
  }

  handleMouseDown() {
    const onChangeSelecting = this.props.actions.onChangeSelecting

    if (onChangeSelecting) {
      onChangeSelecting(!this.props.color)
    }

    this.handleSelect(!this.props.color)
  }

  handleSelect(select) {
    const {
      actions: {
        onSelect
      },
      comboGroup
    } = this.props

    if (onSelect) {
      onSelect({
        combos: comboGroup.combos, 
        select
      })
    }
  }
}

export default injectSheet(styles)(ComboCell)