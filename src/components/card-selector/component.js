import ComboCell from 'components/card-selector/combo-cell'
import styles from 'components/card-selector/styles'
import {types} from 'lib/combos'
import Menu from '@material-ui/core/Menu'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

const rowCounts = {
  [types.OFFSUIT]: [3,3,3,3],
  [types.PAIR]: [3,3],
  [types.SUITED]: [2,2]
}

class CardSelector extends Component {

  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      onSelect: PropTypes.func
    }).isRequired,
    anchorEl: PropTypes.object,
    comboGroup: PropTypes.shape({
      combos: PropTypes.arrayOf(PropTypes.object),
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      type: PropTypes.string
    }),
    onClose: PropTypes.func,
    transformOrigin: PropTypes.shape({
      horizontal: PropTypes.string,
      vertical: PropTypes.string
    })
  }

  render() {
    let component = null

    if (this.props.comboGroup) {
      component = this.renderCardSelector()
    }

    return component
  }

  renderCardSelector() {
    const comboType = this.props.comboGroup.type
    const rows = rowCounts[comboType]

    return (
      <Menu {...this.getProps()} >
        <Table padding="dense"> 
          <TableBody>
            {this.renderSelectorRows(rows)}
          </TableBody>
        </Table>
      </Menu>
    ) 
  }

  renderSelectorRows(rows) {
    const combos = this.props.comboGroup.combos
    let currentIndex = 0

    return rows.map((count, row) => {
      const end = currentIndex + count
      const rowCombos = combos.slice(currentIndex, currentIndex + count)

      currentIndex = end

      return (
        <TableRow key={row}>
          {rowCombos.map((combo, col) => {
            return <ComboCell {...this.getComboCellProps(combo, rows, row, col)} />
          })}
        </TableRow>
      )
    })
  }

  getProps() {
    const anchorEl = this.props.anchorEl

    return {
      anchorEl: anchorEl,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'center'
      },
      MenuListProps: {
        className: this.props.classes.list
      },
      onClose: this.handleClose,
      open: !!anchorEl
    }
  }

  getComboCellProps(combo, rows, row, col) {
    return {
      combo,
      key: combo.id,
      lastColumn: col === rows[col] - 1,
      lastRow: row === rows.length - 1
    }
  }

  handleClose() {
    const onClose = this.props.onClose 

    if (onClose) {
      onClose()
    }
  }

  handleSelect(combos) {
    const onSelect = this.props.actions.onSelect

    if (onSelect) {
      onSelect(combos)
    }
  }
}

export default injectSheet(styles)(CardSelector)