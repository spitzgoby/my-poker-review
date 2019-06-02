import Board from 'components/board'
import {styles} from 'components/home/home-styles'
import RangeAnalyzer from 'components/range-analyzer'
import RangeBuilder from 'components/range-builder'
import Grid from '@material-ui/core/Grid'
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
          <Grid item xs={12} lg={7}>
            <div> 
              <RangeAnalyzer />
            </div>
          </Grid>
          <Grid item xs={12} lg={5}>
            <RangeBuilder />
            <Board className={classes.board} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default injectSheet(styles)(Home)
