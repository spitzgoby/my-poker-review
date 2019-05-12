import classnames from 'classnames'
import styles from 'components/board/input/styles'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class BoardInput extends Component {

  constructor(props) {
    super(props)

    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.setBoardInputRef = this.setBoardInputRef.bind(this)
  }

  static propTypes = {
    board: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    street: PropTypes.string
  }

  render() {
    return (
      <TextField {...this.getTextFieldProps()} />
    ) 
  }

  renderClearButton() {
    return (
      <Fade in={!!this.props.board}>
        <InputAdornment position="end">
          <IconButton onClick={this.handleClearButtonClick}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      </Fade>
    )
  }

  getTextFieldProps() {
    const { 
      board,
      street
    } = this.props

    return {
      className: this.getClass(),
      InputProps: {
        endAdornment: this.renderClearButton(),
      },
      inputRef: this.setBoardInputRef,
      label: street,
      maxLength: 10,
      onChange: this.handleBoardChange,
      value: board,
      variant: 'outlined'
    }
  }

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(classes.board, className)
  }

  handleBoardChange(event) {
    this.updateBoard(event.target.value)
  }

  handleClearButtonClick(event) {
    this.updateBoard('')

    this.focusInput()
  }

  updateBoard(value) {
    const onChange = this.props.onChange

    if (onChange) {
      onChange(value)
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