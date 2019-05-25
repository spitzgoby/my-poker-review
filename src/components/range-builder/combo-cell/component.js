import classnames from 'classnames'
import {styles} from 'components/range-builder/combo-cell/styles'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class ComboCell extends Component {

  constructor(props) {
    super(props)

    this.handleSelectorButtonClick = this.handleSelectorButtonClick.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)

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
    lastRow: PropTypes.bool,
    onOpenCardSelector: PropTypes.func,
    selected: PropTypes.bool,
    selecting: PropTypes.bool
  }

  static dragImage = document.createElement('span')

  render() {
    const {
      classes,
      comboGroup
    } = this.props

    return (
        <div {...this.getProps()}>
          <div className={classes.spacer} />
          <div>{comboGroup.text}</div>
            <div className={classes.selectorcontainer}>
              <Tooltip title="Select suits">
                  <div {...this.getSelectorButtonProps()} />
              </Tooltip>
            </div>
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
      ref: this.props.selectableRef
    } 
  }

  getSelectorButtonProps() {
    return {
      className: this.props.classes.selectorbutton,
      onClick: this.handleSelectorButtonClick,
      onMouseDown: this.handleSelectorButtonMouseDown,
      role: 'button'
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
    this.handleSelect(this.props.selecting)
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

  handleMouseDown() {
    const onChangeSelecting = this.props.actions.onChangeSelecting

    this.toggleFirstDragged(true)

    if (onChangeSelecting) {
      onChangeSelecting(!this.props.selected)
    }

    this.handleSelect(!this.props.selected)
  }

  handleMouseUp() {
    this.toggleFirstDragged(false)
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

  handleSelectorButtonClick(event) {
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