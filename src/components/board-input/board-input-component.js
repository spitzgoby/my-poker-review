import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class BoardInput extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    return (
      <div className={this.getClass()}> 
        <input></input>
      </div>
    ) 
  }

  getClass() {
    return classnames('board-input', this.props.className)
  }
}

export default BoardInput