import BoardInput from 'components/board-input'
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import RangeAnalyzerToolbar from 'components/range-analyzer/toolbar'
import RangeAnalyzerRow from 'components/range-analyzer/row'
import React, {Component} from 'react'
import {styles} from 'components/range-analyzer/range-analyzer-styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'

class RangeAnalyzer extends Component {

  constructor(props) {
    super(props)

    this.handleClearAllButtonClick = this.handleClearAllButtonClick.bind(this)
    this.handleClearCombosButtonClick = this.handleClearCombosButtonClick.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)

    this.state = {
      anchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onAddRange: PropTypes.func,
      onClearCombos: PropTypes.func,
      onEdit: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    ranges: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string
    }))
  }

  static defaultProps = {
    ranges: []
  }

  render() {
    const classes = this.props.classes

    return (
      <Paper> 
        <RangeAnalyzerToolbar />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">
                Hands (%)
              </TableCell>
              <TableCell align="right">
                Combos (#)
              </TableCell>
              <TableCell align="right">
                Range (%)
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Clear all ranges">
                  <Button onClick={this.handleClearCombosButtonClick}>
                    Clear
                  </Button>
                </Tooltip>
                {this.renderEditButton()}
              </TableCell>
            </TableRow>              
          </TableHead>
          <TableBody>
            {this.renderRangeRows()}
          </TableBody>
        </Table>
        <div className={classes.boardinput}>
          <BoardInput />
          <Button onClick={this.handleClearAllButtonClick}>
            Clear All
          </Button>
        </div>
      </Paper>
    ) 
  }

  renderEditButton() {
    const editing = this.props.editing
    const title = editing ? 'Cancel editing' : 'Edit ranges'

    return (
      <Tooltip title={title}>
        <IconButton onClick={this.handleEditButtonClick}>
          { editing
            ? <ClearIcon />
            : <EditIcon />
          }
        </IconButton>
      </Tooltip>
    )
  }

  renderRangeRows() {
    return this.props.ranges.map(range => (
      <RangeAnalyzerRow {...this.getRangeRowProps(range)} />
    ))
  }

  getRangeRowProps(range) {
    return {
      editing: this.props.editing,
      key: range.id,
      range
    }
  }

  handleClearCombosButtonClick() {
    const onClearCombos = this.props.actions.onClearCombos

    if (onClearCombos) {
      onClearCombos()
    }
  }

  handleEditButtonClick() {
    const onEdit = this.props.actions.onEdit

    if (onEdit) {
      onEdit()
    }
  }

  handleClearAllButtonClick() {
    const onClearAll = this.props.actions.onClearAll

    if (onClearAll) {
      onClearAll()
    }   
  }

}

export default injectSheet(styles)(RangeAnalyzer)