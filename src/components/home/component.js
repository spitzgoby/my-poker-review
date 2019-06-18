import AppBar from 'components/app-bar'
import Board from 'components/board'
import Hand from 'components/hand'
import {styles} from 'components/home/styles'
import RangeAnalyzer from 'components/range-analyzer'
import RangeBuilder from 'components/range-builder'
import {modes} from 'lib/application-constants'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

import 'typeface-roboto'

class Home extends Component {

  static propTypes = {
    mode: PropTypes.oneOf([modes.EQUITY, modes.RANGES]),
    ranges: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      selectedComboIds: PropTypes.arrayOf(PropTypes.string)
    })).isRequired
  }

  render() {
    const {
      classes, 
      mode 
    } = this.props

    return (
      <div className={classes.root}>
        <AppBar />
        <Grid container spacing={16}>
          <Grid container direction="column" spacing={16} item xs={12} lg={7}>
            <Grid item>
              <RangeAnalyzer />
            </Grid>
            {
              mode === modes.EQUITY 
              ? <Grid container spacing={16} item>
                  <Grid item xs={12} sm={6} xl={4}>
                    <Board />
                  </Grid>
                  <Grid item xs={12} sm={6} xl={4}>
                    <Paper>
                      <Hand />
                    </Paper>
                  </Grid>
                </Grid>
              : null
            }
          </Grid>
          <Grid item xs={12} lg={5} className={classes.rangebuilder}>
              <RangeBuilder />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default injectSheet(styles)(Home)
