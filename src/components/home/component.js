import AppBar from 'components/app-bar'
import {styles} from 'components/home/styles'
import RangeAnalzyer from 'components/range-analyzer'
import RangeBuilder from 'components/range-builder'
import RangeCompositionChart from 'components/range-composition-chart'
import {modes} from 'lib/application-constants'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

import 'typeface-roboto'

class Home extends Component {

  static propTypes = {
    compositionChartOpen: PropTypes.bool, 
    mode: PropTypes.oneOf([modes.EQUITY, modes.QUIZ, modes.RANGES])
  }

  render() {
    const {
      classes,
      compositionChartOpen
    } = this.props

    return (
      <div className={classes.root}>
        <AppBar />
        <Grid container spacing={16}>
          <Grid classes={{root: classes.analyzergrid}} container direction="column" spacing={16} item xs={12} lg={7}>
            <Grid item>
              <RangeAnalzyer />
            </Grid>
            { compositionChartOpen 
                ? (<Grid item>
                    <RangeCompositionChart />
                  </Grid>)
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
