import classnames from 'classnames'
import CardInput from 'components/card-input'
import styles from 'components/board/styles'
import CardList from 'components/card-list'
import {inputModes} from 'lib/application-constants'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Board extends Component {

  constructor(props) {
    super(props)

    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handleCardSelect = this.handleCardSelect.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      clearBoard: PropTypes.func,
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
      </div>
    ) 
  }

  renderCardLists() {
    return (
      <Grid container direction="row">
        <CardList {...this.getCardListProps()} />
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

  getCardListProps() {
    return {
      cards: this.props.cards,
      count: 5,
      label: 'BOARD',
      onCardSelect: this.handleCardSelect,
      onClear: this.handleClear
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

  handleCardSelect(card, index) {
    const selectBoardCards = this.props.actions.selectBoardCards

    if (selectBoardCards) {
      selectBoardCards({
        card,
        index
      })
    }
  }

  handleClear() {
    const clearBoard = this.props.actions.clearBoard

    if (clearBoard) {
      clearBoard()
    }    
  }

  handleBoardChange(value) {
    const setBoard = this.props.actions.setBoard

    if (setBoard) {
      setBoard({value})
    }
  }
}

export default injectSheet(styles)(Board)