import CardCell from 'components/card-selector/card-cell'
import styles from 'components/card-selector/styles'
import {createCard} from 'lib/cards'
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
    const aceOfClubs = createCard('A', 'h')
    const aceOfDiamonds = createCard('A', 'd')
    const aceOfHearts = createCard('A', 'h')
    const aceOfSpades = createCard('A', 's')

    return (
      <Menu anchorEl={this.props.anchorEl} open={!!this.props.anchorEl}>
        <Table padding="dense"> 
          <TableBody>
            <TableRow>
              <TableCell />
              <CardCell card={aceOfClubs} />
              <CardCell card={aceOfDiamonds} />
              <CardCell card={aceOfHearts} />
              <CardCell card={aceOfSpades} />
            </TableRow>
            <TableRow>
              <CardCell card={aceOfClubs} />
              <TableCell> 
                Ac
              </TableCell>
              <TableCell> 
                Ad
              </TableCell>
              <TableCell> 
                Ah
              </TableCell>
              <TableCell> 
                As
              </TableCell>
            </TableRow>
            <TableRow>
              <CardCell card={aceOfDiamonds} />
              <TableCell> 
                Ac
              </TableCell>
              <TableCell> 
                Ad
              </TableCell>
              <TableCell> 
                Ah
              </TableCell>
              <TableCell> 
                As
              </TableCell>
            </TableRow>
            <TableRow>
              <CardCell card={aceOfHearts} />
              <TableCell> 
                Ac
              </TableCell>
              <TableCell> 
                Ad
              </TableCell>
              <TableCell> 
                Ah
              </TableCell>
              <TableCell> 
                As
              </TableCell>
            </TableRow>
            <TableRow>
              <CardCell card={aceOfSpades} />
              <TableCell> 
                Ac
              </TableCell>
              <TableCell> 
                Ad
              </TableCell>
              <TableCell> 
                Ah
              </TableCell>
              <TableCell> 
                As
              </TableCell>
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