import classnames from 'classnames'
import CardSelector from 'components/card-selector'
import ComboCell from 'components/range-builder/combo-cell'
import {styles} from 'components/range-builder/styles'
import comboGroups from 'lib/combo-groups'
import Card from '@material-ui/core/Card'
import {comboRows} from 'modules/range-builder/constants'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeBuilder extends Component {

  constructor(props) {
    super(props)

    this.handleCardSelectorClose = this.handleCardSelectorClose.bind(this)
    this.handleOpenCardSelector = this.handleOpenCardSelector.bind(this)

    this.state = {
      cardSelectorAnchor: null,
      cardSelectorComboGroup: null
    }
  }

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
          <CardSelector {...this.getCardSelectorProps()} />
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
      onOpenCardSelector: this.handleOpenCardSelector,
      key: comboGroupId,
      selectedColor: this.props.selectedColor
    }
  }

  getCardSelectorProps() {
    const {
      cardSelectorAnchor,
      cardSelectorComboGroup
    } = this.state

    return {
      anchorEl: cardSelectorAnchor,
      comboGroup: cardSelectorComboGroup,
      onClose: this.handleCardSelectorClose
    }
  }

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(classes.rangebuilder, className)
  }

  handleOpenCardSelector(event, comboGroup) {
    this.setState({
      cardSelectorAnchor: event.currentTarget,
      cardSelectorComboGroup: comboGroup
    })
  }

  handleCardSelectorClose() {
    this.setState({
      cardSelectorAnchor: null,
      cardSelectorComboGroup: null
    })
  }
}

export default injectSheet(styles)(RangeBuilder)