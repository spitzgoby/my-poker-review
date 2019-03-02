import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import rangeOutputStyles from 'components/range-output/range-output-styles'
import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'

import 'components/range-output/range-output.scss'

class RangeOutput extends Component {

  constructor(props) {
    super(props)

    this.handleCardClick = this.handleCardClick.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      selectRange: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
    rangeOutput: PropTypes.string
  }

  static defaultProps = {
    color: 'red'
  }

  render() {
    return (
      <Card {...this.getCardProps()}>
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

  getCardProps() {
    return {
      className: this.getCardClasses(),
      onClick: this.handleCardClick
    }
  }

  getCardClasses() {
    const {
      classes,
      color
    } = this.props

    return classnames(classes.card, classes[color])
  }

  getCardContentClasses() {
    return this.props.classes.cardcontent
  }

  handleCardClick() {
    const selectRange = this.props.actions.selectRange

    if (selectRange) {
      selectRange({
        name: this.props.name
      })
    }
  }
}

export default withStyles(rangeOutputStyles)(RangeOutput)