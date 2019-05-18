import ComboCell from 'components/card-selector/combo-cell'
import styles from 'components/card-selector/styles'
import {combos} from 'lib/combos'
import Menu from '@material-ui/core/Menu'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
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
    anchorEl: PropTypes.node,
    comboGroup: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      type: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <Menu {...this.getProps()} >
        <Table padding="dense"> 
          <TableBody>
            <TableRow>
              <ComboCell combo={combos['AcAd']} />
              <ComboCell combo={combos['AcAh']} />
              <ComboCell combo={combos['AcAs']} />
            </TableRow>
            <TableRow>
              <ComboCell combo={combos['AdAh']} />
              <ComboCell combo={combos['AdAs']} />
              <ComboCell combo={combos['AhAs']} />
            </TableRow>
          </TableBody>
        </Table>
      </Menu>
    ) 
  }

  getProps() {
    const anchorEl = this.props.anchorEl

    return {
      anchorEl: anchorEl,
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