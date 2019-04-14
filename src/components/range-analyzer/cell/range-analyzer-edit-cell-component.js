import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/cell/range-analyzer-edit-cell-styles'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'

class RangeAnalyzerEditCell extends Component {

  constructor(props) {
    super(props)

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this)
    this.handleExpandButtonClick = this.handleExpandButtonClick.bind(this)
  }

  static propTypes = {
    editing: PropTypes.bool,
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
      <TableCell className={classes.cell} align="right"> 
        { editing 
          ? null
          : this.renderClearButton()
        }
        { editing 
          ? this.renderDeleteButton()
          : this.renderExpandButton()
        }
      </TableCell>
    ) 
  }

  renderClearButton() {
    return (
      <Tooltip title={`Clear ${this.props.range.name}`}>
        <Button className={this.props.classes.button} onClick={this.handleClearButtonClick}>
          Clear
        </Button>
      </Tooltip>
    )
  }

  renderDeleteButton() {
    return (
      <Tooltip title={`Delete ${this.props.range.name}`}>
        <IconButton className={this.props.classes.button} onClick={this.handleDeleteButtonClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    )
  }

  renderExpandButton() {
    return (
      <Tooltip title="Show range text">
        <IconButton className={this.props.classes.expand} onClick={this.handleExpandButtonClick}>
          <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
    )
  }

  handleClearButtonClick() {
    const onClear = this.props.onClear

    if (onClear) {
      onClear()
    }
  }

  handleDeleteButtonClick() {
    const onDelete = this.props.onDelete

    if (onDelete) {
      onDelete()
    }
  }

  handleExpandButtonClick() {
    const onExpand = this.props.onExpand

    if (onExpand) {
      onExpand()
    }
  }
}

export default injectSheet(styles)(RangeAnalyzerEditCell)