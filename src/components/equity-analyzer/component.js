import styles from 'components/equity-analyzer/styles'
import RangeTable from 'components/range-table'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class EquityAnalyzer extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {}

  render() {
    return (
      <Paper>
        <RangeTable />
      </Paper>
    ) 
  }
}

export default injectSheet(styles)(EquityAnalyzer)