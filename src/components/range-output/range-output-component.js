import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import rangeOutputStyles from 'components/range-output/range-output-styles'
import React, {Component} from 'react'

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
    rangeOutput: PropTypes.string,
    selected: PropTypes.bool
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
      output = "No combos selected"
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
      classes
    } = this.props

    return classnames(classes.card)
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

export default injectSheet(rangeOutputStyles)(RangeOutput)