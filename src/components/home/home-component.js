import Board from 'components/board'
import {styles} from 'components/home/home-styles'
import RangeAnalyzer from 'components/range-analyzer'
import RangeBuilder from 'components/range-builder'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

import 'typeface-roboto'

class Home extends Component {

  static propTypes = {
    ranges: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      selectedComboIds: PropTypes.arrayOf(PropTypes.string)
    })).isRequired
  }

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid container direction="column" spacing={16} item xs={12} lg={7}>
            <Grid item>
              <RangeAnalyzer />
            </Grid>
            <Grid container spacing={16} item>
              <Grid item xs={12} md={6}>
                <Board />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper>
                  <Typography className={classes.subtitle} variant="h5">
                    Hand
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
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
