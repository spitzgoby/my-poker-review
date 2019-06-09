import CardBackPath from 'components/card-icon/card-back-path'
import RankPath from 'components/card-icon/rank-path'
import SuitPath from 'components/card-icon/suit-path'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/card-icon/styles'

class CardIcon extends Component {

  static propTypes = {
    card: PropTypes.shape({
      rank: PropTypes.string,
      suit: PropTypes.string
    }),
    size: PropTypes.oneOf(['sm', 'md']),
    variant: PropTypes.oneOf(['outline', 'shadow'])
  }

  static defaultProps = {
    variant: 'shadow'
  }

  render() {
    const {
      card
    } = this.props

    return (
      <svg {...this.getProps()}>
        {card
            ? this.renderCardFront(card)
            : <CardBackPath />
        }
      </svg>
    )
  }

  renderCardFront(card) {
    return (
      <g>
        <RankPath rank={card.rank} />
        <SuitPath suit={card.suit} />
      </g>
    )
  }

  getProps() {
    return {
      className: this.props.classes.icon,
      viewBox: '0 0 84 128',
      x: '0',
      xmlSpace: 'preserve',
      y: '0' 
    }
  }
}

export default injectSheet(styles)(CardIcon)