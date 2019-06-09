import classnames from 'classnames'
import CardBackPath from 'components/card-icon/card-back-path'
import CardSelector from 'components/card-selector'
import RankPath from 'components/card-icon/rank-path'
import SuitPath from 'components/card-icon/suit-path'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react'
import styles from 'components/card-icon/styles'

class CardIcon extends Component {
  constructor(props) {
    super(props)

    this.handleCardSelectorClose = this.handleCardSelectorClose.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      cardSelectorAnchorEl: null
    }
  }

  static propTypes = {
    card: PropTypes.shape({
      rank: PropTypes.string,
      suit: PropTypes.string
    }),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    shouldSelectCard: PropTypes.bool,
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
      <Fragment>
        <svg {...this.getProps()}>
          {card
              ? this.renderCardFront(card)
              : <CardBackPath />
          }
        </svg>
        <CardSelector {...this.getCardSelectorProps()} />
      </Fragment>
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
      className: this.getClass(),
      onClick: this.handleClick,
      viewBox: '0 0 84 128',
      x: '0',
      xmlSpace: 'preserve',
      y: '0' 
    }
  }

  getCardSelectorProps() {
    const cardSelectorAnchorEl = this.state.cardSelectorAnchorEl

    return {
      allCards: true,
      anchorEl: cardSelectorAnchorEl,
      onClose: this.handleCardSelectorClose,
      open: !!cardSelectorAnchorEl
    }
  }

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(classes.icon, className)
  }

  handleClick(event) {
    const {
      disabled,
      shouldSelectCard
    } = this.props

    if (shouldSelectCard && !disabled) {
      this.setState({
        cardSelectorAnchorEl: event.currentTarget
      })
    }
  }

  handleCardSelectorClose() {
    this.setState({
      cardSelectorAnchorEl: null
    })
  }
}

export default injectSheet(styles)(CardIcon)