import RangeAnalyzerToolbar from 'components/range-analyzer/toolbar'
import RangeTable from 'components/range-table'
import Paper from '@material-ui/core/Paper'
import React, {Component} from 'react'

class RangeAnalyzer extends Component {
  render() {
    return (
      <Paper> 
        <RangeAnalyzerToolbar />
        <RangeTable />
      </Paper>
    ) 
  }
}

export default RangeAnalyzer