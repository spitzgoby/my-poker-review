import styles from 'components/board/street/styles'
import CardIcon from 'components/card-icon'
import {STREETS} from 'lib/poker-constants'
import {times} from 'lodash'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Street extends Component {

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    street: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className={this.props.classes.street}> 
        {this.renderCards()}
        {this.renderSubtitle()}
      </div>
    ) 
  }

  renderCards() {
    const {
      classes,
      street
    } = this.props

    const count = STREETS[street].count

    return (
      <span className={classes.cards}>{
        times(count, (index) => {
          return this.renderCard(index) 
        }) 
      }</span>
    )
  }

  renderCard(index) {
    const cards = this.props.cards 
    let cardProps

    if (index < cards.length) {
      const card = cards[index]
      cardProps = this.getCardProps(card, card.id)
    } else {
      cardProps = this.getCardProps(null, index) 
    }

    return <CardIcon {...cardProps} />
  }

  renderSubtitle() {
    const {
      classes,
      street
    } = this.props

    return (
      <div className={classes.subtitle}>
        <Typography color="secondary" variant="subtitle2">
          {street}
        </Typography>
      </div>
    )
  }

  getCardProps(card, key) {
    return {
      card,
      className: this.props.classes.card,
      key,
      shouldSelectCard: true
    }
  }
}

export default injectSheet(styles)(Street)