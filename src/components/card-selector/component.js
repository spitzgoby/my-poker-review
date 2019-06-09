import CardIcon from 'components/card-icon'
import styles from 'components/card-selector/styles'
import {cards} from 'lib/cards'
import {times} from 'lodash'
import Menu from '@material-ui/core/Menu'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

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
        {this.renderTable()}
      </Menu>
    )
  }

  renderTable() {
    return (
      <Table padding="dense">
        <TableBody>
          {this.renderCards()}
        </TableBody>
      </Table>
    )
  }

  renderCards() {
    const rowLength = 4
    const rows = 13

    return times(rows, (i) => {
      return (
        <TableRow key={i} style={{paddingLeft: '8px'}}>
          {times(rowLength, (j) => {
            const card = cards[j + i*rowLength]

            return (
              <TableCell padding="none" key={`${i}${j}`}>
                <CardIcon card={card} key={card.id} className={this.props.classes.card} />
              </TableCell>
            )
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