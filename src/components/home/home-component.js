import Board from 'components/board'
import RangeAnalyzer from 'components/range-analyzer'
import RangeBuilder from 'components/range-builder'
import {styles} from 'components/home/home-styles'
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
      <div className={classes.home}>
        <RangeBuilder className={classes.builder}/>
        <div className={classes.info}> 
          <RangeAnalyzer />
          <Board className={classes.board} />
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(Home)
