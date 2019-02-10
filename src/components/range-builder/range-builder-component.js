import ComboCell from './combo-cell'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './range-builder.scss'

class RangeBuilder extends Component {
  constructor(props) {
    super(props)

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      clearSelectedComboIds: PropTypes.func
    }).isRequired,
    comboIds: PropTypes.arrayOf(PropTypes.string),
    rangeOutput: PropTypes.string
  }

  render() {
    return (
      <div className="range-builder">
        <h1>Range Builder</h1> 
        {this.renderRangeTable()}
        {this.renderRangeOutput()}
      </div>
    ) 
  }

  renderRangeTable() {
    return (
      <table>
        <tbody>
          {this.renderCombos()}
        </tbody>
      </table>
    )
  }

  renderRangeOutput() {
    return (
      <div className="range-builder--range-output">
        <span className="range-builder--range-output-label">Range</span>:
        <input value={this.props.rangeOutput}></input>
        <button {...this.getClearButtonProps()}>Clear</button>
      </div>
    )
  }

  renderCombos() {
    const comboRows = this.buildComboRows()

    return comboRows.map(this.renderRow)
  }

  renderRow(row, index) {
    return (
      <tr key={index}>
        {row.map(comboId => <ComboCell key={comboId} comboId={comboId} />)}
      </tr>
    )
  }

  getClearButtonProps() {
    return {
      className: 'range-builder--range-output-clear-button',
      onClick: this.handleClearButtonClick
    }
  }

  handleClearButtonClick() {
    const {clearSelectedComboIds} = this.props.actions

    if (clearSelectedComboIds) {
      clearSelectedComboIds()
    }
  }

  buildComboRows() {
    let comboIds = this.props.comboIds
    let currentRow = 0
    let index = 0
    let rows = []
    const rowWidth = 13

    while(index < comboIds.length) {
      rows.push([])
      for (let i = 0; i < rowWidth; i++) {
        rows[currentRow].push(comboIds[index])
        index++
      }
      currentRow++
    }

    return rows
  }
}

export default RangeBuilder