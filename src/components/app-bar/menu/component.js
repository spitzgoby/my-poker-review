import styles from 'components/app-bar/menu/styles'
import {
  inputModes,
  modes
} from 'lib/application-constants'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
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
      <Drawer open={open} onClose={onClose}> 
        <List>
          {this.renderModeSubMenu()}
          {this.renderDeckSubMenu()}
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
        <ListItem>
          <ListItemText>
            Mode
          </ListItemText>
        </ListItem>
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

  renderDeckSubMenu() {
    const classes = this.props.classes

    return (
      <Fragment>
        <ListItem>
          <ListItemText>
            Deck
          </ListItemText>
        </ListItem>
        <ListItem className={classes.nested} button>
          <ListItemText>2 Color</ListItemText>
        </ListItem>
        <ListItem divider className={classes.nested} selected button>
          <ListItemText>4 Color</ListItemText>
        </ListItem>
      </Fragment>
    )
  }

  renderInputTypeSubMenu() {
    const classes = this.props.classes

    return (
      <Fragment>
        <ListItem>
          <ListItemText>
            Hand and Board Input
          </ListItemText>
        </ListItem>
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
    const {
      classes,
      mode
    } = this.props

    return {
      button: true,
      className: classes.nested, 
      onClick: () => this.handleModeClick(modes.EQUITY),
      selected: mode === modes.EQUITY 
    }
  }

  getRangesListItemsProps() {
    const {
      classes,
      mode
    } = this.props

    return {
      button: true,
      className: classes.nested,
      divider: true,
      onClick: () => this.handleModeClick(modes.RANGES),
      selected: mode === modes.RANGES
    }
  }

  getCardInputListItemProps() {
    const {
      classes,
      inputMode
    } = this.props

    return {
      button: true,
      className: classes.nested,
      onClick: () => this.handleCardInputModeClick(inputModes.CARD),
      selected: inputMode === inputModes.CARD
    }
  }

  getTextInputListItemProps() {
    const {
      classes,
      inputMode
    } = this.props

    return {
      button: true,
      className: classes.nested,
      divider: true,
      onClick: () => this.handleCardInputModeClick(inputModes.TEXT),
      selected: inputMode === inputModes.TEXT
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