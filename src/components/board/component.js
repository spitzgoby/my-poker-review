import classnames from 'classnames'
import CardInput from 'components/card-input'
import CardSelector from 'components/card-selector'
import styles from 'components/board/styles'
import CardList from 'components/card-list'
import {inputModes} from 'lib/application-constants'
import {STREETS} from 'lib/poker-constants'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Board extends Component {

  constructor(props) {
    super(props)

    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handleCardSelect = this.handleCardSelect.bind(this)
    this.handleCardSelectorClose = this.handleCardSelectorClose.bind(this)
    this.handleStreetClick = this.handleStreetClick.bind(this)

    this.state = {
      cardSelectorAnchorEl: null,
      cardSelectorIndex: null,
      cardSelectorStreet: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      selectBoardCards: PropTypes.func,
      setBoard: PropTypes.func,
      setInputMode: PropTypes.func
    }).isRequired,
    board: PropTypes.string,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string
      })
    ),
    className: PropTypes.string,
    inputMode: PropTypes.oneOf([inputModes.CARD, inputModes.TEXT])
  }

  render() {
    return (
      <div className={this.getClass()}>
        <Grid container>
          <Grid className={this.getInputClass()} item xs={12}>
            {this.props.inputMode === inputModes.CARD 
              ? this.renderCardLists()
              : <CardInput {...this.getCardInputProps()} />
            }
          </Grid>
        </Grid>
        <CardSelector {...this.getCardSelectorProps()} />
      </div>
    ) 
  }

  renderCardLists() {
    return (
      <Grid container direction="row">
        <CardList {...this.getCardListProps('FLOP')} />
        <CardList {...this.getCardListProps('TURN')} />
        <CardList {...this.getCardListProps('RIVER')} />
      </Grid>
    )
  }

  getCardInputProps() {
    const {
      board,
      classes
    } = this.props

    return {
      className: classnames(classes.input, classes.flop),
      label: 'Board',
      maxLength: 10,
      onChange: this.handleBoardChange,
      value: board
    }
  }

  getCardListProps(streetName) {
    const cards = this.props.cards
    const street = STREETS[streetName]
    const index = street.index

    return {
      cards: cards.slice(index, street.length),
      count: street.count,
      disabled: index > this.props.cards.length,
      index: index,
      label: streetName,
      onCardClick: (index, event) => this.handleStreetClick(streetName, index, event)
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

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(classes.board, className)
  }

  getInputClass() {
    const {
      classes,
      inputMode
    } = this.props

    return inputMode === inputModes.TEXT
      ? classes.text
      : ''
  }

  handleBoardChange(value) {
    const setBoard = this.props.actions.setBoard

    if (setBoard) {
      setBoard({value})
    }
  }

  handleStreetClick(street, index, event) {
    this.setState({
      cardSelectorAnchorEl: event.currentTarget,
      cardSelectorIndex: index,
      cardSelectorStreet: street
    })
  }

  handleCardSelect(card) {
    const selectBoardCards = this.props.actions.selectBoardCards
    const {
      cardSelectorIndex: index,
      cardSelectorStreet: street
    } = this.state


    if (selectBoardCards) {
      selectBoardCards({
        card,
        index,
        street
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
      cardSelectorIndex: null,
      cardSelectorStreet: null
    })

  }
}

export default injectSheet(styles)(Board)