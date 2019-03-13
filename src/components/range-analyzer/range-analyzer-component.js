import AddIcon from '@material-ui/icons/Add'
import BoardInput from 'components/board-input'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import RangeAnalyzerRow from 'components/range-analyzer/range-analyzer-row'
import React, {Component} from 'react'
import {styles} from 'components/range-analyzer/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

class RangeAnalyzer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }
  }

  static propTypes = {
    className: PropTypes.string
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
          <IconButton aria-label="Add" onClick={(e) => this.handleAddClick(e)}>
            <AddIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => this.handleMenuClose()}>
            <MenuItem onClick={() => this.handleMenuItemClick('Yellow')}>
              Yellow
            </MenuItem>
            <MenuItem onClick={() => this.handleMenuItemClick('Green')}>
              Green
            </MenuItem>
          </Menu>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">
                % Hands 
              </TableCell>
              <TableCell align="right">
                # Combos 
              </TableCell>
              <TableCell align="right">
                % Range
              </TableCell>
              <TableCell align="right">
                <Button >
                  Clear
                </Button>
              </TableCell>
            </TableRow>              
          </TableHead>
          <TableBody>
            {this.renderRangeRows()}
            <TableRow className={classes.rangerow2}>
              <TableCell className={classes.rangecell} padding="checkbox">
                <Checkbox className={classes.rangecell}/>
              </TableCell>
              <TableCell>Fold</TableCell>
              <TableCell className={classes.rangecell}>
                KK+,AQs+
              </TableCell>
              <TableCell className={classes.rangecell} align="right">
                1.2%
              </TableCell>
              <TableCell className={classes.rangecell} align="right">
                20
              </TableCell>
              <TableCell className={classes.rangecell} align="right">
                100%
              </TableCell>
              <TableCell align="right">
                <Button className={classes.rangeclear}>
                  Clear
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.boardinput}>
          <BoardInput />
          <Button>Clear All</Button>
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

  handleMenuClose() {
    this.setState({
      anchorEl: null
    })
  }

  handleMenuItemClick(color) {
    console.log(color + ' clicked')
    this.handleMenuClose()
  }
}

export default injectSheet(styles)(RangeAnalyzer)