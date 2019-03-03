import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'

class BoardInput extends Component {

  constructor(props) {
    super(props)

    this.handleBoardChange = this.handleBoardChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setBoard: PropTypes.func
    })
  }

  render() {
    return (
        <TextField {...this.getInputProps()} />
    ) 
  }

  renderClearButton() {
    let component = null

    if (this.props.board) {
      component = (
          <InputAdornment position="end">
            <IconButton><ClearIcon /></IconButton>
          </InputAdornment>
      )
    }

    return component
  }

  getInputProps() {
    const board = this.props.board

    return {
      InputProps: {
        endAdornment: this.renderClearButton(),
      },
      label: 'Board',
      onChange: this.handleBoardChange,
      value: board,
      variant: 'outlined'
    }
  }

  handleBoardChange(event) {
    const setBoard = this.props.actions.setBoard

    if (setBoard) {
      setBoard({
        value: event.target.value
      })
    }
  }
}

export default BoardInput