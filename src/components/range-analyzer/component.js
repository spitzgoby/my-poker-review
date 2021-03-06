import {modes} from 'lib/application-constants'
import Board from 'components/board'
import Button from '@material-ui/core/Button'
import DefaultRangesDialog from './default-ranges-dialog'
import styles from './styles'
import RangeTable from 'components/range-table'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Quiz from './quiz'
import Typography from '@material-ui/core/Typography'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzer extends Component {
  constructor(props) {
    super(props)

    this.handleQuizButtonClick = this.handleQuizButtonClick.bind(this)
    this.handleSelectDefaultRangeItemClick = this.handleSelectDefaultRangeItemClick.bind(this)
  }

  render() {
    return (
      <Paper>
        {
          this.props.mode === modes.QUIZ 
            ? this.renderQuizMode() 
            : this.renderRangesMode()
        }
      </Paper>
    ) 
  }

  renderQuizMode() {
    return <Quiz />
  }

  renderRangesMode() {
    return (
      <>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6} xl={4}>
            <Board />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <div className={this.props.classes.takeQuizButtonContainer}>
              <Button {...this.getTakeQuizButtonProps()}>Take Quiz</Button>
            </div>
          </Grid>
        </Grid>
        {
          this.props.rangeIdList.length > 0
            ? <RangeTable />
            : this.renderRangesMessage()
        }
        <DefaultRangesDialog />
        <Button {...this.getSelectDefaultRangeButtonProps()}>Select a pre-defined range</Button>
      </>
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

  getTakeQuizButtonProps() {
    return {
      color: "secondary", 
      onClick: this.handleQuizButtonClick, 
      variant: "outlined"
    }
  }

  getSelectDefaultRangeButtonProps() {
    return {
      fullWidth: true, 
      onClick: this.handleSelectDefaultRangeItemClick
    }
  }

  handleQuizButtonClick() {
    const startQuiz = this.props.actions.startQuiz

    if (startQuiz) {
      startQuiz()
    }
  }

  handleSelectDefaultRangeItemClick() {
    const setSelectRangeDialogOpen = this.props.actions.setSelectRangeDialogOpen

    if (setSelectRangeDialogOpen) {
      setSelectRangeDialogOpen()
    }
  }
}

export default injectSheet(styles)(RangeAnalyzer)