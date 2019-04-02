import classnames from 'classnames'
import ComboCell from 'components/range-builder/combo-cell'
import comboRows from 'modules/range-builder/combo-rows'
import comboGroups from 'lib/combo-groups'
import {get} from 'lodash'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {SelectableGroup} from 'react-selectable-fast'
import {styles} from 'components/range-builder/range-builder-styles'

class RangeBuilder extends Component {

  constructor(props) {
    super(props)

    this.handleSelection = this.handleSelection.bind(this)
  }

  static propTypes = {
    className: PropTypes.string,
    selectedColor: PropTypes.string
  }

  static lastColumnIndex = 12
  static lastRowIndex = 12

  render() {
    return (
      <div className={this.getClass()}>
        <SelectableGroup {...this.getSelectableGroupProps()}>
          {this.renderComboGroups()}
        </SelectableGroup>
      </div>
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

  getSelectableGroupProps() {
    return {
      onSelectionFinish: this.handleSelection,
      resetOnStart: true
    }
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

  handleSelection(items) {
    const onSelect = this.props.actions.onSelect

    if (onSelect) {
      const allCombos = items.reduce((acc, item) => {
        const combos = get(item, 'props.comboGroup.combos')

        if (combos) {
          acc = acc.concat(combos)
        }     

        return acc
      }, [])

      onSelect({combos: allCombos})
    }
  }
}

export default injectSheet(styles)(RangeBuilder)