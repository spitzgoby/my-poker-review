import classnames from 'classnames'
import ComboCell from './combo-cell'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import 'components/range-builder/range-builder.scss'

class RangeBuilder extends Component {

  static propTypes = {
    className: PropTypes.string,
    comboIds: PropTypes.arrayOf(PropTypes.string),
  }

  render() {
    return (
      <div className={this.getClass()}>
        {this.renderRangeTable()}
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

  getClass() {
    return classnames("range-builder", this.props.className)
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