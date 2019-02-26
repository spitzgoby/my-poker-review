import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
        <input {...this.getInputProps()}></input>
      </div>
    ) 
  }

  getInputProps() {
    const board = this.props.board

    return {
      onChange: this.handleBoardChange,
      value: board
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