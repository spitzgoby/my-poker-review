import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/range-color-block-styles.js'

class component extends Component {

  static propTypes = {
    color: PropTypes.string
  }

  render() {
    const {
      classes,
      color
    } = this.props

    return (
      <div className={classes.block} />
    ) 
  }
}

export default injectSheet(styles)(component)