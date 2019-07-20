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
    this.setSelectableRef = this.setSelectableRef.bind(this)

    this.state = {
      firstDragged: false
    }
  }
  
  static propTypes = {
    actions: PropTypes.shape({
      onChangeSelecting: PropTypes.func,
      onSelect: PropTypes.func
    }).isRequired,
    comboGroup: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      type: PropTypes.string
    }).isRequired,
    highlightedCombos: PropTypes.arrayOf(PropTypes.string),
    lastColumn: PropTypes.bool,
    onOpenCardSelector: PropTypes.func,
    range: PropTypes.object,
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
      ref: this.setSelectableRef
    } 
  }

  getClass() {
    const classes = {
      [this.props.classes.combocell]: true,
      firstdragged: this.state.firstDragged,
      highlighted: this.isHighlighted()
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
    const touchEndedInComponent = this.didTouchEndInComponent(event);

    event.preventDefault()

    if (touchEndedInComponent) {
      if (selectingSuits) {
        this.openCardSelector(event)
      } else {
        this.handleSelect(!selected)
      }
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

  isHighlighted() {
    const {
      comboGroup,
      highlightedComboGroups
    } = this.props

    return highlightedComboGroups[comboGroup.id]
  }

  setSelectableRef(node) {
    this.selectableRef = node
  }

  openCardSelector(event) {
    const {
      comboGroup,
      onOpenCardSelector,
      selectedRangeId
    } = this.props

    if (onOpenCardSelector && selectedRangeId) {
      onOpenCardSelector(event, comboGroup)
    }
  }

  toggleFirstDragged(firstDragged) {
    this.setState({
      firstDragged
    })
  } 

  didTouchEndInComponent(event) {
    const boundingRect = this.selectableRef.getBoundingClientRect()
    const touch = event.changedTouches[0]
    const x = touch.clientX
    const y = touch.clientY

    return x > boundingRect.left 
      && x < boundingRect.right
      && y > boundingRect.top
      && y < boundingRect.bottom
  }
}

export default injectSheet(styles)(ComboCell)