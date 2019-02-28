import Button from '@material-ui/core/Button'
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

  constructor(props) {
    super(props)

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.comboRows = this.buildComboRows(props)
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
        <div className="range-builder--toolbar">
          <Button {...this.getClearButtonProps()}>Clear</Button>
        </div>
        <table> 
          <tbody>
            {this.renderCombos()}
          </tbody>
        </table>
      </div>
    )
  }

  renderCombos() {
    return this.comboRows.map(this.renderRow)
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
      color: 'secondary',
      onClick: this.handleClearButtonClick,
      style: {marginRight: "1rem"},
      variant: 'outlined'
    }
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

  handleClearButtonClick() {
    const {clearSelectedComboIds} = this.props.actions

    if (clearSelectedComboIds) {
      clearSelectedComboIds()
    }
  }
}

export default RangeBuilder