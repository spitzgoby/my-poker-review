import classnames from 'classnames'
import CardSelector from 'components/card-selector'
import ComboCell from 'components/range-builder/combo-cell'
import {styles} from 'components/range-builder/styles'
import comboGroups from 'lib/combo-groups'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {comboRows} from 'modules/range-builder/constants'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeBuilder extends Component {

  constructor(props) {
    super(props)

    this.handleCardSelectorClose = this.handleCardSelectorClose.bind(this)
    this.handleOpenCardSelector = this.handleOpenCardSelector.bind(this)
    this.handleSuitSelectorClick = this.handleSuitSelectorClick.bind(this)

    this.state = {
      cardSelectorAnchor: null,
      cardSelectorComboGroup: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onSelectSuits: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    selectedColor: PropTypes.string,
    selectingSuits: PropTypes.bool
  }

  static lastColumnIndex = 12
  static lastRowIndex = 12

  render() {
    return (
      <Paper className={this.getClass()}>
          {this.renderComboGroups()}
          <Button {...this.getSuitSelectorButtonProps()}>Select Suits</Button>
          <CardSelector {...this.getCardSelectorProps()} />
      </Paper>
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

  getSuitSelectorButtonProps() {
    const selectingSuits = this.props.selectingSuits

    return {
      color: selectingSuits ? 'primary' : 'default',
      onClick: this.handleSuitSelectorClick,
      variant: selectingSuits ? 'contained' : 'default' 
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

  handleSuitSelectorClick() {
    const onSelectSuits = this.props.actions.onSelectSuits

    if (onSelectSuits) {
      onSelectSuits()
    }
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