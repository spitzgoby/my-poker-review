import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/cell/range-analyzer-edit-cell-styles'
import TableCell from '@material-ui/core/TableCell'

class RangeAnalyzerEditCell extends Component {

  constructor(props) {
    super(props)

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.handleExpandButtonClick = this.handleExpandButtonClick.bind(this)
  }

  static propTypes = {
    onClear: PropTypes.func,
    onExpand: PropTypes.func,
    range: PropTypes.shape({
      color: PropTypes.string
    }),
    selected: PropTypes.bool
  }

  render() {
    return (
      <TableCell className={this.props.classes.cell} align="right"> 
        {this.renderClearButton()}
        {this.renderExpandButton()}
      </TableCell>
    ) 
  }

  renderClearButton() {
    return (
      <Button className={this.props.classes.clear} onClick={this.handleClearButtonClick}>
        Clear
      </Button>
    )
  }

  renderExpandButton() {
    return (
      <IconButton className={this.props.classes.expand} onClick={this.handleExpandButtonClick}>
        <ExpandMoreIcon />
      </IconButton>
    )
  }

  handleClearButtonClick() {
    const onClear = this.props.onClear

    if (onClear) {
      onClear()
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