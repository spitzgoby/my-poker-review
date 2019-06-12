import classnames from 'classnames'
import CardInput from 'components/card-input'
import CardSelector from 'components/card-selector'
import styles from 'components/board/styles'
import CardList from 'components/card-list'
import {STREETS} from 'lib/poker-constants'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
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
      setBoard: PropTypes.func
    }).isRequired,
    board: PropTypes.string,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string
      })
    ),
    className: PropTypes.string
  }

  render() {
    const classes = this.props.classes

    return (
      <Paper className={this.getClass()}> 
        <Grid container>
          <Grid item xs={12}>
            <CardInput {...this.getCardInputProps()} />
          </Grid>
          <Grid item xs={12}>
            <Grid className={classes.streets} container direction="row">
              <CardList {...this.getCardListProps('FLOP')} />
              <CardList {...this.getCardListProps('TURN')} />
              <CardList {...this.getCardListProps('RIVER')} />
            </Grid>
          </Grid>
        </Grid>
        <CardSelector {...this.getCardSelectorProps()} />
      </Paper>
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