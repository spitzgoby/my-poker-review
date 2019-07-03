import styles from 'components/app-bar/toolbar/color-block/styles.js'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class ColorBlock extends Component {

  static propTypes = {
    color: PropTypes.string
  }

  render() {
    return (
      <div className={this.props.classes.block} />
    ) 
  }
}

export default injectSheet(styles)(ColorBlock)