import AddIcon from '@material-ui/icons/Add'
import BoardInput from 'components/board-input'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import RangeAnalyzerRow from 'components/range-analyzer/row'
import React, {Component} from 'react'
import {styles} from 'components/range-analyzer/range-analyzer-styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

class RangeAnalyzer extends Component {

  constructor(props) {
    super(props)

    this.handleClearCombosButtonClick = this.handleClearCombosButtonClick.bind(this)

    this.state = {
      anchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onAddRange: PropTypes.func,
      onClearCombos: PropTypes.func
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
    const {
      classes
    } = this.props
    const anchorEl = this.state.anchorEl

    return (
      <Paper> 
        <Toolbar className={classes.toolbar} >
          <Typography variant="h5">
            Range Analyzer
          </Typography>
          <Tooltip title="Add a new range">
            <IconButton aria-label="Add" onClick={(e) => this.handleAddClick(e)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => this.handleMenuClose()}>
            <MenuItem onClick={() => this.handleMenuItemClick('yellow')}>
              Yellow
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick('red')}>
              Red
            </MenuItem>
          </Menu>
        </Toolbar>
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
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>              
          </TableHead>
          <TableBody>
            {this.renderRangeRows()}
          </TableBody>
        </Table>
        <div className={classes.boardinput}>
          <BoardInput />
          <Button >Clear All</Button>
        </div>
      </Paper>
    ) 
  }

  renderRangeRows() {
    return this.props.ranges.map(range => (
      <RangeAnalyzerRow range={range} key={range.id} />
    ))
  }

  handleAddClick(e) {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  handleClearCombosButtonClick() {
    const onClearCombos = this.props.actions.onClearCombos

    if (onClearCombos) {
      onClearCombos()
    }
  }

  handleMenuClose() {
    this.setState({
      anchorEl: null
    })
  }

  handleMenuItemClick(color) {
    const onAddRange = this.props.actions.onAddRange

    this.handleMenuClose()

    if (onAddRange) {
      onAddRange({color})
    }
  }
}

export default injectSheet(styles)(RangeAnalyzer)