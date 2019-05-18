import CardIcon from 'components/card-icon'
import styles from 'components/card-selector/combo-cell/styles'
import TableCell from '@material-ui/core/TableCell'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class ComboCell extends Component {

  static propTypes = {
    color: PropTypes.string,
    combo: PropTypes.shape({
      cards: PropTypes.array,
      id: PropTypes.string
    }),
    selected: PropTypes.bool,
    selectedColor: PropTypes.string 
  }

  render() {
    return (
      <TableCell className={this.props.classes.cell}> 
        <CardIcon {...this.getCardIconProps(0)} />
        <CardIcon {...this.getCardIconProps(1)} />
      </TableCell>
    ) 
  }

  getCardIconProps(index) {
    return {
      card: this.props.combo.cards[index],
      size: 'sm',
      variant: 'outline'
    }
  }
}

export default injectSheet(styles)(ComboCell)