import classnames from 'classnames'
import CardBackPath from 'components/card-icon/card-back-path'
import RankPath from 'components/card-icon/rank-path'
import SuitPath from 'components/card-icon/suit-path'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/card-icon/styles'

class CardIcon extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    card: PropTypes.shape({
      rank: PropTypes.string,
      suit: PropTypes.string
    }),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['lg', 'md']),
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
      className: this.getClass(),
      id: this.props.id,
      onClick: this.handleClick,
      viewBox: '0 0 84 128',
      x: '0',
      xmlSpace: 'preserve',
      y: '0' 
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
      onClick
    } = this.props

    if (!disabled && onClick) {
      onClick(event)
    }
  }
}

export default injectSheet(styles)(CardIcon)



