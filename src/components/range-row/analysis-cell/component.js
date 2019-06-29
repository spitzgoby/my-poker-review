import RangeRowCell from 'components/range-row/cell'
import styles from 'components/range-row/analysis-cell/styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'
  
class RangeAnalysisCell extends Component {

  static propTypes = {
    editing: PropTypes.bool,
    range: PropTypes.shape({
      color: PropTypes.string
    }),
    selected: PropTypes.bool,
    type: PropTypes.oneOf(['ratio', 'count']),
    value: PropTypes.number
  }

  render() {
    const classes = this.props.classes

    return (
      <RangeRowCell className={classes.cell} align="right"> 
          {this.renderAnalysis()}
      </RangeRowCell>
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