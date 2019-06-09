import ComboCell from 'components/card-selector/combo-cell'
import styles from 'components/card-selector/styles'
import {types} from 'lib/combos'
import {times} from 'lodash'
import Menu from '@material-ui/core/Menu'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

const rowCounts = {
  [types.OFFSUIT]: [4,4,4],
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
    deadCards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string
    })),
    onClose: PropTypes.func,
    transformOrigin: PropTypes.shape({
      horizontal: PropTypes.string,
      vertical: PropTypes.string
    })
  }

  render() {
    return (
      <Menu {...this.getProps()} >
        <Table padding="dense"> 
          <TableBody>
            {this.props.comboGroup
              ? this.renderComboGroupCardSelector()
              : this.renderAllCardSelector()
            }
          </TableBody>
        </Table>
      </Menu>
    )
  }

  renderComboGroupCardSelector() {
    const {
      comboGroup: {
        combos,
        type
      } 
    } = this.props

    const rows = rowCounts[type]
    let currentIndex = 0
    let rowIndex = 0

    return rows.map((count, row) => {
      const end = currentIndex + count
      const rowCombos = (type === types.OFFSUIT)
        ? this.getOffsuitRowCombos(combos, rowIndex, rows.length, count)
        : this.getRowCombos(combos, currentIndex, count)

      currentIndex = end
      rowIndex++

      return (
        <TableRow key={row}>
          {rowCombos.map((combo, col) => {
            return <ComboCell {...this.getComboCellProps(combo, rows, row, col)} />
          })}
        </TableRow>
      )
    })
  }

  renderAllCardSelector() {
    return null
  }

  renderSelectorRows(rows) {
  }

  getProps() {
    const anchorEl = this.props.anchorEl

    return {
      anchorEl: anchorEl,
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'center'
      },
      getContentAnchorEl: null,
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

  getOffsuitRowCombos(combos, rowIndex, rows, count) {
    return times(count, (n) => {
      return combos[rowIndex + n * rows] 
    })
  }

  getRowCombos(combos, index, count) {
    return combos.slice(index, index+count)

  }
}

export default injectSheet(styles)(CardSelector)