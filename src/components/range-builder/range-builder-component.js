import ComboCell from './combo-cell'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './range-builder.scss'

class RangeBuilder extends Component {
  static propTypes = {
    comboIds: PropTypes.arrayOf(PropTypes.string)
  }

  render() {
    return (
      <div className="range-builder">
        <h1>Range Builder</h1> 
        <table>
          <tbody>
            {this.renderCombos()}
          </tbody>
        </table>

        <div className="range-builder--text-output">
          <span className="range-builder--text-output-label">Range</span>:
          <input value="AQ+,QQ+"></input>
        </div>
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

  handleSelect(combo) {
    this.props.actions.selectCombo(combo)
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