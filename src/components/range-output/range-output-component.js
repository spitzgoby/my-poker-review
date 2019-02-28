import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import rangeOutputStyles from 'components/range-output/range-output-styles'
import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'

import 'components/range-output/range-output.scss'

class RangeOutput extends Component {

  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    rangeOutput: PropTypes.string
  }

  static defaultProps = {
    color: 'red'
  }

  render() {
    return (
      <Card className={this.props.classes.card}>
        <CardContent className={this.getCardContentClasses()}>
          {this.renderOutput()}
        </CardContent>
      </Card>
    )
  }

  renderOutput() {
    let output = this.props.rangeOutput

    if (!output) {
      output = "Select combos to build a range"
    }

    return output
  }

  getClass() {
    return classnames("range-output", this.props.className)
  }

  getCardContentClasses() {
    const {
      classes,
      color
    } = this.props

    return classnames(classes.cardcontent, classes[color])
  }
}

export default withStyles(rangeOutputStyles)(RangeOutput)