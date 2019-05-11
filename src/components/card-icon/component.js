import RankPath from 'components/card-icon/rank-path'
import SuitPath from 'components/card-icon/suit-path'
import {getCard} from 'lib/cards'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/card-icon/styles'

class CardIcon extends Component {

  static propTypes = {
    cardId: PropTypes.string
  }

  render() {
    const {
      rank,
      suit
    } = getCard(this.props.cardId)

    return (
      <svg {...this.getProps()}>
        <RankPath rank={rank} />
        <SuitPath suit={suit} />
      </svg>
    )
  }

  getProps() {
    return {
      className: this.props.classes.icon,
      viewBox: '0 0 84 128',
      x: '0',
      'xml:space': 'preserve',
      y: '0' 
    }
  }
}

export default injectSheet(styles)(CardIcon)