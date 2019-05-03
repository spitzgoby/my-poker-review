import Card from '@material-ui/core/Card'
import classnames from 'classnames'
import ComboCell from 'components/range-builder/combo-cell'
import {comboRows} from 'modules/range-builder/constants'
import comboGroups from 'lib/combo-groups'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-builder/range-builder-styles'

class RangeBuilder extends Component {

  static propTypes = {
    className: PropTypes.string,
    selectedColor: PropTypes.string
  }

  static lastColumnIndex = 12
  static lastRowIndex = 12

  render() {
    return (
      <Card className={this.getClass()}>
          {this.renderComboGroups()}
      </Card>
    )
  }

  renderComboGroups() {
    return comboRows.map((comboRow, row) => this.renderRow(comboRow, row))
  }

  renderRow(comboRow, row) {
    return (
      <div className={this.props.classes.comborow} key={row}>
        {comboRow.map((comboGroupId, column) => 
          <ComboCell {...this.getComboCellProps(comboGroupId, row, column)} />
        )}
      </div>
    )
  }

  getComboCellProps(comboGroupId, row, column) {
    return {
      comboGroup: comboGroups[comboGroupId],
      lastColumn: column === RangeBuilder.lastColumnIndex,
      lastRow: row === RangeBuilder.lastRowIndex,
      key: comboGroupId,
      selectedColor: this.props.selectedColor
    }
  }

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(classes.rangebuilder, className)
  }
}

export default injectSheet(styles)(RangeBuilder)