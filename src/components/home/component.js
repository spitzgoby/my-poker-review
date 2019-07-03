import AppBar from 'components/app-bar'
import {styles} from 'components/home/styles'
import EquityAnalzyer from 'components/equity-analyzer'
import RangeBuilder from 'components/range-builder'
import {modes} from 'lib/application-constants'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

import 'typeface-roboto'

class Home extends Component {

  static propTypes = {
    mode: PropTypes.oneOf([modes.EQUITY, modes.RANGES])
  }

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <AppBar />
        <Grid container spacing={16}>
          <Grid className={classes.analyzergrid} container direction="column" spacing={16} item xs={12} lg={7}>
            <Grid item>
              <EquityAnalzyer />
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
