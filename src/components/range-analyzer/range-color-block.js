import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/range-color-block-styles.js'

class component extends Component {

  static propTypes = {
    color: PropTypes.string
  }

  render() {
    return (
      <div className={this.props.classes.block} />
    ) 
  }
}

export default injectSheet(styles)(component)