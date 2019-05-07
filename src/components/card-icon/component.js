import CardIcons from 'components/card-icon/icons'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/card-icon/styles'

class CardIcon extends Component {

  static propTypes = {
    cardId: PropTypes.string
  }

  render() {
    const Icon = CardIcons[this.props.cardId]

    return <Icon {...this.getProps()} />
  }

  getProps() {
    return {
      className: this.props.classes.icon
    }
  }
}

export default injectSheet(styles)(CardIcon)