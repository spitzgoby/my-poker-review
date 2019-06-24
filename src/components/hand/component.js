import CardInput from 'components/card-input'
import CardList from 'components/card-list'
import styles from 'components/hand/styles'
import {inputModes} from 'lib/application-constants'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Hand extends Component {

  constructor(props) {
    super(props)

    this.handleCardInputChange = this.handleCardInputChange.bind(this)
    this.handleCardSelect = this.handleCardSelect.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      clearHand: PropTypes.func,
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
      <div className={classes.hand}>
        <Grid container>
          <Grid className={this.getInputClass()} item xs={12}>
            {inputMode === inputModes.CARD
              ? <CardList {...this.getCardListProps()} />
              : <CardInput {...this.getCardInputProps()} />
            }
          </Grid>
        </Grid>
      </div>
    ) 
  }

  getCardListProps() {
    return {
      cards: this.props.handCards,
      count: 2,
      label: 'HAND',
      onCardSelect: this.handleCardSelect,
      onClear: this.handleClear
    }
  }

  getCardInputProps() {
    return {
      label: 'Hand',
      maxLength: 4,
      onChange: this.handleCardInputChange,
      value: this.props.hand
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

  handleCardSelect(card, index) {
    const selectHandCards = this.props.actions.selectHandCards

    if (selectHandCards) {
      selectHandCards({
        card,
        index
      })
    }
  }

  handleClear() {
    const clearHand = this.props.actions.clearHand

    if (clearHand) {
      clearHand()
    }
  }

  handleCardInputChange(value) {
    const setHand = this.props.actions.setHand

    if (setHand) {
      setHand(value)
    }
  }
}

export default injectSheet(styles)(Hand)