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
      rank,
      suit
    } = this.props.card

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
      xmlSpace: 'preserve',
      y: '0' 
    }
  }
}

export default injectSheet(styles)(CardIcon)