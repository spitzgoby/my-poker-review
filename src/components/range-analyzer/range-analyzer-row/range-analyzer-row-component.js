import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-analyzer/range-analyzer-row/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

class RangeAnalyzerRow extends Component {

  static propTypes = {
    className: PropTypes.string,
    range: PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    rangeAnalysis: PropTypes.shape({
      combosCount: PropTypes.number,
      handsRatio: PropTypes.number,
      rangeRation: PropTypes.number
    }),
    rangeOutput: PropTypes.string
  }

  render() {
    const {
      classes,
      rangeAnalysis = {},
      rangeOutput,
      range
    } = this.props

    return (
      <TableRow className={classes.row}>
        <TableCell className={classes.cell} padding="checkbox">
          <Checkbox className={classes.cell}/>
        </TableCell>
        {this.renderCell(range.name, 'left')}
        {this.renderCell(rangeOutput, 'left')}
        {this.renderPercentageCell('handsRatio')}
        {this.renderCell(rangeAnalysis.combosCount)}
        {this.renderPercentageCell('rangeRatio')}
        <TableCell align="right">
          <Button className={classes.rangeclear}>
            Clear
          </Button>
        </TableCell>
      </TableRow>
    ) 
  }

  renderPercentageCell(ratioName) {
    const rangeAnalysis = this.props.rangeAnalysis
    let content = null

    if (rangeAnalysis) {
      content = (rangeAnalysis[ratioName] * 100).toFixed(1) + '%'
    }

    return this.renderCell(content)
  }

  renderCell(content, align = 'right') {
    return (
      <TableCell className={this.props.classes.cell} align={align}>
        {content}
      </TableCell>
    )
  }
}

export default injectSheet(styles)(RangeAnalyzerRow)