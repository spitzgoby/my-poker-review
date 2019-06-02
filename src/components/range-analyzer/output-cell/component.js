import RangeAnalyzerCell from 'components/range-analyzer/cell'
import styles from 'components/range-analyzer/output-cell/styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

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
      <RangeAnalyzerCell {...this.getProps()}> 
        <span className={classes.text}>
          {rangeOutput}
        </span>
      </RangeAnalyzerCell>
    ) 
  }

  getProps() {
    return {
      align: 'right',
      className: this.props.classes.cell,
      colSpan: 4
    }
  }
}

export default injectSheet(styles)(RangeAnalyzerOutputCell)