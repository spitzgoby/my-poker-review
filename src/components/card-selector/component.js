import CardCell from 'components/card-selector/card-cell'
import ComboCell from 'components/card-selector/combo-cell'
import styles from 'components/card-selector/styles'
import {createCard} from 'lib/cards'
import {combos} from 'lib/combos'
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
      <Menu anchorEl={this.props.anchorEl} open={!!this.props.anchorEl}>
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

  handleSelect(combos) {
    const onSelect = this.props.actions.onSelect

    if (onSelect) {
      onSelect(combos)
    }
  }
}

export default injectSheet(styles)(CardSelector)