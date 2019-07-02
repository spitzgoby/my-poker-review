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
    disabled: PropTypes.bool,
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
    const {
      combo,
      disabled
    } = this.props

    return {
      card: combo.cards[index],
      disabled,
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
      disabled,
      selected
    } = this.props

    if (!disabled && onSelect) {
      onSelect({
        combos: [combo],
        select: !selected
      })
    }
  }
}

export default injectSheet(styles)(ComboCell)