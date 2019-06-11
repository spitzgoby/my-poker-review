import classnames from 'classnames'
import BoardInput from 'components/board/input'
import CardSelector from 'components/card-selector'
import styles from 'components/board/styles'
import Street from 'components/board/street'
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
            <BoardInput {...this.getFlopProps()} />
          </Grid>
          <Grid item xs={12}>
            <Grid className={classes.streets} container direction="row">
              <Street {...this.getStreetProps('FLOP')} />
              <Street {...this.getStreetProps('TURN')} />
              <Street {...this.getStreetProps('RIVER')} />
            </Grid>
          </Grid>
        </Grid>
        <CardSelector {...this.getCardSelectorProps()} />
      </Paper>
    ) 
  }

  getFlopProps() {
    const {
      board,
      classes
    } = this.props

    return {
      board,
      className: classnames(classes.input, classes.flop),
      onChange: this.handleBoardChange
    }
  }

  getStreetProps(street) {
    return {
      disabled: STREETS[street].index > this.props.cards.length,
      onCardClick: this.handleStreetClick,
      street
    }
  }

  getCardSelectorProps() {
    const cardSelectorAnchorEl = this.state.cardSelectorAnchorEl

    return {
      allCards: true,
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
    const disabled = this.props.disabled

    if (!disabled) {
      this.setState({
        cardSelectorAnchorEl: event.currentTarget,
        cardSelectorIndex: index,
        cardSelectorStreet: street
      })
    }
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