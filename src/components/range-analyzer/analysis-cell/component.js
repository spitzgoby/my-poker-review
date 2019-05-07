import styles from 'components/range-analyzer/analysis-cell/styles'
import TableCell from '@material-ui/core/TableCell'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'
  
class RangeAnalyzerAnalysisCell extends Component {

  static propTypes = {
    range: PropTypes.shape({
      color: PropTypes.string
    }),
    selected: PropTypes.bool,
    type: PropTypes.oneOf(['ratio', 'count']),
    value: PropTypes.number
  }

  render() {
    return (
      <TableCell className={this.props.classes.cell} align="right"> 
        {this.renderAnalysis()}
      </TableCell>
    ) 
  }

  renderAnalysis() {
    const {
      classes,
      type,
      value
    } = this.props
    let result = null

    if (value) {
      result = type === 'ratio' 
        ? (value * 100).toFixed(1) + '%'
        : value
    }

    return (
      <span className={classes.text}>
        {result}
      </span>
    )
  }
}

export default injectSheet(styles)(RangeAnalyzerAnalysisCell)