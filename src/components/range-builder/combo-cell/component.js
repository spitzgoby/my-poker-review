import classnames from 'classnames'
import {styles} from 'components/range-builder/combo-cell/styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class ComboCell extends Component {

  constructor(props) {
    super(props)

    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)

    this.state = {
      firstDragged: false
    }
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
    lastColumn: PropTypes.bool,
    onOpenCardSelector: PropTypes.func,
    selected: PropTypes.bool,
    selecting: PropTypes.bool,
    selectingSuits: PropTypes.bool
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
      className: this.getClass(),
      draggable: true,
      onDragEnd: this.handleDragEnd,
      onDragEnter: this.handleDragEnter,
      onDragStart: this.handleDragStart,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      ref: this.props.selectableRef
    } 
  }

  getClass() {
    const classes = {
      [this.props.classes.combocell]: true,
      firstdragged: this.state.firstDragged
    }

    return classnames(classes)
  }

  handleDragEnter() {
    const {
      selecting,
      selectingSuits
    } = this.props

    if (!selectingSuits) {
      this.handleSelect(selecting)
    }
  }

  handleDragEnd() {
    if (this.state.firstDragged) {
      this.toggleFirstDragged(false)
    }
  }

  handleDragStart(event) {
    const dataTransfer = event.dataTransfer

    if (dataTransfer) {
      dataTransfer.setData('text/plain', '')
      dataTransfer.setDragImage(ComboCell.dragImage, 0, 0)
    }
  }

  handleMouseDown(event) {
    const {
      actions: {
        onChangeSelecting 
      },
      selectingSuits
    } = this.props

    if (selectingSuits) {
      this.openCardSelector(event)
    } else {
      this.toggleFirstDragged(true)

      if (onChangeSelecting) {
        onChangeSelecting(!this.props.selected)
      }

      this.handleSelect(!this.props.selected)
    }
  }

  handleMouseUp() {
    this.toggleFirstDragged(false)
  }

  handleTouchEnd(event) {
    const {
      selected,
      selectingSuits
    } = this.props

    event.preventDefault()

    if (selectingSuits) {
      this.openCardSelector(event)
    } else {
      this.handleSelect(!selected)
    }
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

  handleSelectorButtonMouseDown(event) {
    event.stopPropagation()
  }

  openCardSelector(event) {
    const {
      comboGroup,
      onOpenCardSelector
    } = this.props

    if (onOpenCardSelector) {
      onOpenCardSelector(event, comboGroup)
    }
  }

  toggleFirstDragged(firstDragged) {
    this.setState({
      firstDragged
    })
  } 
}

export default injectSheet(styles)(ComboCell)