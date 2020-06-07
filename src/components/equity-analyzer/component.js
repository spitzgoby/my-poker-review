import {modes} from 'lib/application-constants'
import Board from 'components/board'
import Button from '@material-ui/core/Button'
import DefaultRangesDialog from './default-ranges-dialog'
import styles from 'components/equity-analyzer/styles'
import Hand from 'components/hand'
import RangeTable from 'components/range-table'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class EquityAnalyzer extends Component {
  constructor(props) {
    super(props)

    this.handleSelectDefaultRangeItemClick = this.handleSelectDefaultRangeItemClick.bind(this)
  }

  render() {
    return (
      <Paper>
        <Grid container spacing={16} item>
          {
              this.props.mode === modes.EQUITY 
                ? (
                  <Grid item xs={12} sm={6} xl={4}>
                    <Hand />
                  </Grid>
                )
                : null
            
          }
          <Grid item xs={12} sm={6} xl={4}>
            <Board />
          </Grid>
        </Grid>
        {
          this.props.rangeIdList.length > 0
            ? <RangeTable />
            : this.renderRangesMessage()
        }
        <DefaultRangesDialog />
        <Button fullWidth={true} onClick={this.handleSelectDefaultRangeItemClick}>Select a pre-defined range</Button>
      </Paper>
    ) 
  }

  renderRangesMessage() {
    return (
      <div className={this.props.classes.rangemessage}>
        <Typography>
          No ranges available
        </Typography>
      </div>
    )
  }

  handleSelectDefaultRangeItemClick() {
    const setSelectRangeDialogOpen = this.props.actions.setSelectRangeDialogOpen

    if (setSelectRangeDialogOpen) {
      setSelectRangeDialogOpen()
    }
  }
}

export default injectSheet(styles)(EquityAnalyzer)