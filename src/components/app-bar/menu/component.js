import Actions from 'components/app-bar/menu/actions'
import styles from 'components/app-bar/menu/styles'
import {
  inputModes,
  modes
} from 'lib/application-constants'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import BallotIcon from '@material-ui/icons/Ballot'
import PieChartIcon from '@material-ui/icons/PieChart'
import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react'
import injectSheet from 'react-jss'

class Menu extends Component {

  static propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
  }

  render() {
    const {
      open,
      onClose
    } = this.props

    return (
      <Drawer anchor="right" open={open} onClose={onClose}> 
        <List>
          {this.renderModeSubMenu()}
          {this.renderInputTypeSubMenu()}
        </List>
      </Drawer>
    ) 
  }

  renderModeSubMenu() {
    const {
      classes,
    } = this.props

    return (
      <Fragment> 
        <Actions />
        <ListSubheader>
          Mode
        </ListSubheader>
        <ListItem {...this.getEquityListItemProps()} >
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText>Equity</ListItemText>
        </ListItem>
        <ListItem {...this.getRangesListItemsProps()}>
          <ListItemIcon>
            <BallotIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>Range</ListItemText>
        </ListItem>
      </Fragment>
    )
  }

  renderInputTypeSubMenu() {
    return (
      <Fragment>
        <ListSubheader>
          Hand and Board Input
        </ListSubheader>
        <ListItem {...this.getCardInputListItemProps()}>
          <ListItemText>Card</ListItemText>
        </ListItem>
        <ListItem {...this.getTextInputListItemProps()}>
          <ListItemText>Text</ListItemText>
        </ListItem>
      </Fragment>
    )
  }

  getEquityListItemProps() {
    return {
      button: true,
      onClick: () => this.handleModeClick(modes.EQUITY),
      selected: this.props.mode === modes.EQUITY 
    }
  }

  getRangesListItemsProps() {
    return {
      button: true,
      divider: true,
      onClick: () => this.handleModeClick(modes.RANGES),
      selected: this.props.mode === modes.RANGES
    }
  }

  getCardInputListItemProps() {
    return {
      button: true,
      onClick: () => this.handleCardInputModeClick(inputModes.CARD),
      selected: this.props.inputMode === inputModes.CARD
    }
  }

  getTextInputListItemProps() {
    return {
      button: true,
      divider: true,
      onClick: () => this.handleCardInputModeClick(inputModes.TEXT),
      selected: this.props.inputMode === inputModes.TEXT
    }
  }

  handleModeClick(mode) {
    const setMode = this.props.actions.setMode

    if (setMode) {
      setMode(mode)
    }
  }

  handleCardInputModeClick(mode) {
    const setInputMode = this.props.actions.setInputMode 

    if (setInputMode) {
      setInputMode(mode)
    }
  }
}

export default injectSheet(styles)(Menu)