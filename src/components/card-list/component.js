import styles from 'components/card-list/styles'
import CardIcon from 'components/card-icon'
import {times} from 'lodash'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class CardList extends Component {

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    label: PropTypes.string,
    onCardClick: PropTypes.func
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
      count
    } = this.props

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
      cardProps = this.getCardProps(card, card.id, index)
    } else {
      cardProps = this.getCardProps(null, index, index) 
    }

    return <CardIcon {...cardProps} />
  }

  renderSubtitle() {
    const {
      classes,
      label
    } = this.props

    return (
      <div className={classes.subtitle}>
        <Typography className={classes.subtitle} variant="subtitle2">
          {label}
        </Typography>
      </div>
    )
  }

  getCardProps(card, key, index) {
    const {
      cards,
      classes,
      disabled
    } = this.props

    return {
      card,
      className: classes.card,
      disabled: disabled || index > cards.length,
      key,
      onClick: (event) => this.handleCardClick(index, event)
    }
  }

  handleCardClick(index, event) {
    const {
      onCardClick
    } = this.props

    if (onCardClick) {
      onCardClick(index, event)
    }
  }
}

export default injectSheet(styles)(CardList)