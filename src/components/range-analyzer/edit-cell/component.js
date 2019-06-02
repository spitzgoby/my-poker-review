import RangeAnalyzerCell from 'components/range-analyzer/cell'
import styles from 'components/range-analyzer/edit-cell/styles'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerEditCell extends Component {

  constructor(props) {
    super(props)

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this)
    this.handleExpandButtonClick = this.handleExpandButtonClick.bind(this)
  }

  static propTypes = {
    editing: PropTypes.bool,
    expandable: PropTypes.bool,
    onClear: PropTypes.func,
    onExpand: PropTypes.func,
    range: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string
    }),
    selected: PropTypes.bool
  }

  render() {
    const {
      classes,
      editing
    } = this.props

    return (
      <RangeAnalyzerCell className={classes.cell} align="right"> 
        {
          !editing 
            ? <Fade in={!editing}>{this.renderClearButton()}</Fade>
            : null
        }{
          editing 
            ? <Fade in={editing}>{this.renderDeleteButton()}</Fade>
            : null
        }
      </RangeAnalyzerCell>
    ) 
  }

  renderClearButton() {
    return (
      <Tooltip title={`Clear ${this.getTooltipTitleName()}`}>
        <Button className={this.props.classes.button} onClick={this.handleClearButtonClick}>
          Clear
        </Button>
      </Tooltip>
    )
  }

  renderDeleteButton() {
    return (
      <Tooltip title={`Delete ${this.getTooltipTitleName()}`}>
        <IconButton className={this.props.classes.button} onClick={this.handleDeleteButtonClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    )
  }

  getTooltipTitleName() {
    const range = this.props.range
    let name = 'all'

    if (range) {
      name = range.name
    }

    return name
  }

  handleClearButtonClick(event) {
    const onClear = this.props.onClear

    event.stopPropagation()

    if (onClear) {
      onClear()
    }
  }

  handleDeleteButtonClick(event) {
    const onDelete = this.props.onDelete

    event.stopPropagation()

    if (onDelete) {
      onDelete()
    }
  }

  handleExpandButtonClick(event) {
    const onExpand = this.props.onExpand

    event.stopPropagation()

    if (onExpand) {
      onExpand()
    }
  }
}

export default injectSheet(styles)(RangeAnalyzerEditCell)