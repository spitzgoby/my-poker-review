import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/cell/range-analyzer-output-cell-styles'
import TableCell from '@material-ui/core/TableCell'

class RangeAnalyzerOutputCell extends Component {

  static propTypes = {
    range: PropTypes.shape({
      color: PropTypes.string
    }),
    rangeOutput: PropTypes.string,
    selected: PropTypes.bool
  }

  render() {
    const {
      classes,
      rangeOutput
    } = this.props

    return (
      <TableCell className={classes.cell} colSpan={4} align="left"> 
        <span className={classes.text}>
          {rangeOutput}
        </span>
      </TableCell>
    ) 
  }
}

export default injectSheet(styles)(RangeAnalyzerOutputCell)