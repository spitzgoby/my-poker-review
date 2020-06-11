import classnames from 'classnames'
import ComboSelector from 'components/combo-selector'
import ComboCell from 'components/range-builder/combo-cell'
import {styles} from 'components/range-builder/styles'
import comboGroups from 'lib/combo-groups'
import {modes} from 'lib/application-constants'
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

  render() {
    return (
      <Paper className={this.getClass()}>
          {this.renderComboGroups()}
          <Button {...this.getSuitSelectorButtonProps()}>Select Suits</Button>
          <ComboSelector {...this.getCardSelectorProps()} />
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
      mode: this.props.mode,
      onOpenCardSelector: this.handleOpenCardSelector,
      key: comboGroupId,
      selectedColor: this.props.selectedColor
    }
  }

  getSuitSelectorButtonProps() {
    const { 
      classes,
      mode,
      selectingSuits
    } = this.props

    return {
      color: selectingSuits ? 'primary' : 'default',
      className: classes.selectorbutton,
      disabled: mode === modes.QUIZ,
      onClick: this.handleSuitSelectorClick,
      variant: selectingSuits ? 'contained' : 'text' 
    }
  }

  getCardSelectorProps() {
    const {
      cardSelectorAnchor,
      cardSelectorComboGroup,
      cardSelectorTransformOrigin
    } = this.state

    return {
      anchorEl: cardSelectorAnchor,
      comboGroup: cardSelectorComboGroup,
      onClose: this.handleCardSelectorClose,
      transformOrigin: cardSelectorTransformOrigin
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
      cardSelectorComboGroup: comboGroup,
      cardSelectorTransformOrigin: this.getTransformOriginForComboGroup(comboGroup)
    })
  }

  handleCardSelectorClose() {
    this.setState({
      cardSelectorAnchor: null,
      cardSelectorComboGroup: null
    })
  }

  getTransformOriginForComboGroup(comboGroup) {
    let column;
    let currentRow = 0;
    let currentColumn = 0;
    let row; 

    while(!row && currentRow < comboRows.length) {
      const comboRow = comboRows[currentRow]

      while (!column && currentColumn < comboRow.length) {
        const comboGroupId = comboRow[currentColumn]

        if (comboGroupId === comboGroup.id) {
          column = currentColumn
          row = currentRow
        }

        currentColumn++
      }

      currentRow++
    }

    return {
      horizontal: column > (comboRows[0].length / 2) ? 'right' : 'left',
      vertical: row > (comboRows.length / 2) ? 'top' : 'bottom'
    }
  }
}

export default injectSheet(styles)(RangeBuilder)