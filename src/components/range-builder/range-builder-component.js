import classnames from 'classnames'
import ComboCell from './combo-cell'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import 'components/range-builder/range-builder.scss'

class RangeBuilder extends Component {

  constructor(props) {
    super(props)

    this.comboRows = this.buildComboRows(props)
  }

  static propTypes = {
    className: PropTypes.string,
    comboIds: PropTypes.arrayOf(PropTypes.string),
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.combos !== nextProps.combos) {
      this.buildComboRows(nextProps)
    }
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
      <div className="range-builder">
        <table> 
          <tbody>
            {this.renderCombos()}
          </tbody>
        </table>
      </div>
    )
  }

  renderCombos() {
    return this.comboRows.map((comboRow) => this.renderRow(comboRow))
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

  buildComboRows(props) {
    let comboIds = props.comboIds
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