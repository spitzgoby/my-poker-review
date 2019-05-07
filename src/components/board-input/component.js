import CardIcon from 'components/card-icon/component'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'
import styles from 'components/board-input/styles'

class BoardInput extends Component {

  constructor(props) {
    super(props)

    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.setBoardInputRef = this.setBoardInputRef.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setBoard: PropTypes.func
    }),
    board: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    cardIds: []
  }

  render() {
    return (
        <div>
          <TextField {...this.getTextFieldProps()} />
          {this.renderCardIcons()}
        </div>
    ) 
  }

  renderClearButton() {
    let component = null

    if (this.props.board) {
      component = (
          <InputAdornment position="end">
            <IconButton onClick={this.handleClearButtonClick}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
      )
    }

    return component
  }

  renderCardIcons() {
    return this.props.cards.map((card) => {
      return <CardIcon cardId={card.id} key={card.id} />
    })
  }

  getTextFieldProps() {
    const board = this.props.board

    return {
      className: this.props.classes.board,
      InputProps: {
        endAdornment: this.renderClearButton(),
      },
      inputRef: this.setBoardInputRef,
      label: 'Board',
      onChange: this.handleBoardChange,
      value: board,
      variant: 'outlined'
    }
  }

  handleBoardChange(event) {
    this.updateBoard(event.target.value)
  }

  handleClearButtonClick(event) {
    this.updateBoard('')

    this.focusInput()
  }

  updateBoard(value) {
    const setBoard = this.props.actions.setBoard

    if (setBoard) {
      setBoard({value})
    }
  }

  setBoardInputRef(component) {
    this.boardInput = component
  }

  focusInput() {
    this.boardInput.focus()
  }

}

export default injectSheet(styles)(BoardInput)