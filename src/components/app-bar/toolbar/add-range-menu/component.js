import ColorBlock from 'components/app-bar/toolbar/color-block'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import {rangeColorList} from 'styles/colors/range-colors'
import React, {Component} from 'react'

class AddRangeMenu extends Component {

  constructor(props) {
    super(props)

    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      onClose: PropTypes.func
    }).isRequired,
    anchorEl: PropTypes.object,
    open: PropTypes.bool
  }

  render() {
    return (
      <Menu {...this.getAddMenuProps()}>
        {rangeColorList.map((color) => {
          return this.renderMenuItem(color.name)
        })}
      </Menu>
    )
  }

  renderMenuItem(color) {
    return (
      <Tooltip key={color} title={`Add a new ${color} range`}>
        <MenuItem onClick={() => this.handleMenuItemClick(color)}>
          <ColorBlock color={color} />
        </MenuItem>
      </Tooltip>
    )
  }

  getAddMenuProps() {
    const {
      anchorEl,
      open
    } = this.props

    return {
      anchorEl,
      onClose: this.handleMenuClose,
      open
    }
  }

  handleMenuClose() {
    const onClose = this.props.actions.onClose

    if (onClose) {
      onClose()
    }    
  }

  handleMenuItemClick(color) {
    const onAddRange = this.props.actions.onAddRange

    if (onAddRange) {
      onAddRange({color})
    }
  }
}

export default AddRangeMenu