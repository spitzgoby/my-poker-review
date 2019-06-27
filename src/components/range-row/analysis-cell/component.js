import RangeRowCell from 'components/range-row/cell'
import styles from 'components/range-row/analysis-cell/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'
  
class RangeAnalysisCell extends Component {

  static propTypes = {
    editing: PropTypes.bool,
    pending: PropTypes.bool,
    range: PropTypes.shape({
      color: PropTypes.string
    }),
    selected: PropTypes.bool,
    type: PropTypes.oneOf(['ratio', 'count']),
    value: PropTypes.number
  }

  render() {
    const {
      classes,
      pending,
    } = this.props

    return (
      <RangeRowCell className={classes.cell} align="right"> 
        {pending
          ? this.renderProgress()
          : this.renderAnalysis()
        }
      </RangeRowCell>
    ) 
  }

  renderProgress() {
    return (
      <CircularProgress color="inherit" size={32} />
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

export default injectSheet(styles)(RangeAnalysisCell)