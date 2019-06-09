import CardIcon from 'components/card-icon'
import styles from 'components/combo-selector/combo-cell/styles'
import TableCell from '@material-ui/core/TableCell'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class ComboCell extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

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
      <TableCell {...this.getProps()}> 
        <CardIcon {...this.getCardIconProps(0)} />
        <CardIcon {...this.getCardIconProps(1)} />
      </TableCell>
    ) 
  }

  getProps() {
    return {
      className: this.props.classes.cell,
      onClick: this.handleClick
    }
  }

  getCardIconProps(index) {
    return {
      card: this.props.combo.cards[index],
      size: 'sm',
      variant: 'outline'
    }
  }

  handleClick() {
    const {
      actions: {
        onSelect
      },
      combo,
      selected
    } = this.props

    if (onSelect) {
      onSelect({
        combos: [combo],
        select: !selected
      })
    }
  }
}

export default injectSheet(styles)(ComboCell)