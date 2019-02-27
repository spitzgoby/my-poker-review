import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class BoardInput extends Component {

  constructor(props) {
    super(props)

    this.handleBoardChange = this.handleBoardChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setBoard: PropTypes.func
    }),
    className: PropTypes.string
  }

  render() {
    return (
      <div className={this.getClass()}> 
        <TextField {...this.getInputProps()}></TextField>
      </div>
    ) 
  }

  getInputProps() {
    const board = this.props.board

    return {
      label: 'Board',
      onChange: this.handleBoardChange,
      value: board,
      variant: 'outlined'
    }
  }

  getClass() {
    return classnames('board-input', this.props.className)
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