import classnames from 'classnames'
import ComboCell from 'components/range-builder/combo-cell'
import comboRows from 'modules/range-builder/combo-rows'
import comboGroups from 'lib/combo-groups'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-builder/styles'

class RangeBuilder extends Component {

  static propTypes = {
    className: PropTypes.string,
    selectedColor: PropTypes.string
  }

  static lastRowIndex = 12

  render() {
    return (
      <div className={this.getClass()}>
        {this.renderComboGroups()}
      </div>
    )
  }

  renderComboGroups() {
    return comboRows.map((comboRow, index) => this.renderRow(comboRow, index))
  }

  renderRow(row, index) {
    return (
      <div className={this.props.classes.comborow} key={index}>
        {row.map(comboGroupId => 
          <ComboCell {...this.getComboCellProps(comboGroupId, index)} />
        )}
      </div>
    )
  }

  getComboCellProps(comboGroupId, index) {
    return {
      comboGroup: comboGroups[comboGroupId],
      lastRow: index === RangeBuilder.lastRowIndex,
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