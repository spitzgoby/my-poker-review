import Board from 'components/board'
import styles from 'components/equity-analyzer/styles'
import Hand from 'components/hand'
import RangeTable from 'components/range-table'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class EquityAnalyzer extends Component {
  render() {
    return (
      <Paper>
        <Grid container spacing={16} item>
          <Grid item xs={12} sm={6} xl={4}>
            <Board />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <Hand />
          </Grid>
        </Grid>
        <RangeTable />
      </Paper>
    ) 
  }
}

export default injectSheet(styles)(EquityAnalyzer)