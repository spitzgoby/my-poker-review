import CardInput from 'components/card-input'
import CardList from 'components/card-list'
import CardSelector from 'components/card-selector'
import styles from 'components/hand/styles'
import {inputModes} from 'lib/application-constants'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Hand extends Component {

  constructor(props) {
    super(props)

    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleCardInputChange = this.handleCardInputChange.bind(this)
    this.handleCardSelect = this.handleCardSelect.bind(this)
    this.handleCardSelectorClose = this.handleCardSelectorClose.bind(this)

    this.state = {
      cardSelectorAnchorEl: null,
      cardSelectorIndex: null,
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      setHand: PropTypes.func
    }).isRequired,
    hand: PropTypes.string,
    handCards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string
    })),
    inputMode: PropTypes.oneOf([inputModes.CARD, inputModes.TEXT])
  }

  render() {
    const {
      classes,
      inputMode
    } = this.props

    return (
      <Paper className={classes.hand}>
        <Grid container>
          <Grid className={this.getInputClass()} item xs={12}>
            {inputMode === inputModes.CARD
              ? <CardList {...this.getCardListProps()} />
              : <CardInput {...this.getCardInputProps()} />
            }
          </Grid>
        </Grid>
        <CardSelector {...this.getCardSelectorProps()} />
      </Paper>
    ) 
  }

  getCardInputProps() {
    return {
      label: 'Hand',
      maxLength: 4,
      onChange: this.handleCardInputChange,
      value: this.props.hand
    }
  }

  getCardListProps() {
    return {
      cards: this.props.handCards,
      count: 2,
      label: 'HAND',
      onCardClick: this.handleCardClick
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

  getInputClass() {
    const {
      classes, 
      inputMode
    } = this.props

    return inputMode === inputModes.CARD
      ? classes.cards
      : classes.text
  }

  handleCardInputChange(value) {
    const setHand = this.props.actions.setHand

    if (setHand) {
      setHand(value)
    }
  }

  handleCardClick(index, event) {
    this.setState({
      cardSelectorAnchorEl: event.currentTarget,
      cardSelectorIndex: index
    })
  }

  handleCardSelect(card) {
    const cardSelectorIndex = this.state.cardSelectorIndex
    const selectHandCards = this.props.actions.selectHandCards

    if (selectHandCards) {
      selectHandCards({
        card,
        index: cardSelectorIndex
      })
    }

    this.closeCardSelector()
  }

  handleCardSelectorClose() {
    this.closeCardSelector()
  }

  closeCardSelector() {
    this.setState({
      cardSelectorAnchorEl: null,
      cardSelectorIndex: null
    })
  }
}

export default injectSheet(styles)(Hand)