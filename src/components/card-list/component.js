import CardSelector from 'components/card-selector'
import CardIcon from 'components/card-icon'
import styles from 'components/card-list/styles'
import {times} from 'lodash'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class CardList extends Component {

  constructor(props) {
    super(props) 

    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleCardSelect = this.handleCardSelect.bind(this)
    this.handleCardSelectorClose = this.handleCardSelectorClose.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.state = {
      cardSelectorAnchorEl: null,
      cardSelectorIndex: null,
    }
  }  

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    cardSize: PropTypes.oneOf(['lg', 'md']),
    count: PropTypes.number,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    label: PropTypes.string,
    onCardSelect: PropTypes.func,
    onClear: PropTypes.func,
    showCardSelector: PropTypes.bool
  }

  static defaultProps = {
    display: 'inherit',
    showCardSelector: true
  }

  render() {
    return (
      <div className={this.props.classes.cardList}> 
        {this.renderCards()}
        {this.renderClearButton()}
        {this.renderSubtitle()}
        { this.props.showCardSelector 
          ? <CardSelector {...this.getCardSelectorProps()} />
          : null
        }
      </div>
    ) 
  }

  renderCards() {
    const count = this.props.count

    return (
      <span>{
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

  renderClearButton() {
    let content = null;

    if (this.props.showCardSelector) {
      content = (
        <Fade in={this.props.cards.length > 0}>
          <IconButton onClick={this.handleClear}>
            <ClearIcon />
          </IconButton>
        </Fade>
      )
    }

    return content
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
      cardSize,
      classes,
      disabled
    } = this.props

    return {
      card,
      className: classes.card,
      disabled: disabled || index > cards.length,
      id: this.getCardId(index),
      key,
      onClick: (event) => this.handleCardClick(index, event),
      size: cardSize
    }
  }

  getCardSelectorProps() {
    const cardSelectorAnchorEl = this.state.cardSelectorAnchorEl

    return {
      anchorEl: cardSelectorAnchorEl,
      onClose: this.handleCardSelectorClose,
      onSelect: this.handleCardSelect,
      open: !!cardSelectorAnchorEl
    }
  }

  handleCardClick(index, event) {
    if (this.props.showCardSelector) {
      this.setState({
        cardSelectorAnchorEl: event.currentTarget,
        cardSelectorIndex: index
      })
    }
  }

  handleCardSelect(card) {
    const index = this.state.cardSelectorIndex
    const onCardSelect = this.props.onCardSelect

    if (onCardSelect) {
      onCardSelect(card, index)
    }

    this.closeCardSelector(index)
  }

  handleClear() {
    const onClear = this.props.onClear

    if (onClear) {
      onClear()
    }
  }

  handleCardSelectorClose() {
    this.closeCardSelector()
  }

  closeCardSelector(index) {
    const openIndex = index + 1
    let callback

    if (index !== undefined && openIndex < this.props.count) {
      callback = () => this.openCardSelector(openIndex)
    }

    this.setState({
      cardSelectorAnchorEl: null,
      cardSelectorIndex: null
    }, callback)
  }

  openCardSelector(index) {
    const el = document.querySelector(`#${this.getCardId(index)}`)

    this.setState({
      cardSelectorAnchorEl: el,
      cardSelectorIndex: index
    })
  }

  getCardId(index) {
    return this.props.label + 'card' + index
  }
}

export default injectSheet(styles)(CardList)