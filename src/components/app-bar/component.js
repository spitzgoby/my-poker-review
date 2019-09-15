import Menu from 'components/app-bar/menu'
import AppBarToolbar from 'components/app-bar/toolbar'
import styles from 'components/app-bar/styles'
import {modes} from 'lib/application-constants'
import AppBar from '@material-ui/core/AppBar'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Appbar extends Component {

  constructor(props) {
    super(props)

    this.handleCancelEditingClick = this.handleCancelEditingClick.bind(this)
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)

    this.state = {
      menuOpen: false
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      setAppMenuOpen: PropTypes.func
    }).isRequired,
    editing: PropTypes.bool,
    mode: PropTypes.string,
    open: PropTypes.bool
  }

  render() {
    const {
      classes,
      mode,
    } = this.props

    return (
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography className={classes.title} variant="h5">
                {
                  mode === modes.EQUITY
                    ? 'Equity Mode'
                    : 'Ranges Mode'
                }
              </Typography>
            </Grid>
            <Grid item>
              <Hidden only="xs"> 
                <AppBarToolbar />
              </Hidden>
              <Hidden smUp>
                <IconButton {...this.getMenuButtonProps()}>
                  <MenuIcon />
                </IconButton>
                {
                  this.props.editing
                    ? this.renderCancelEditingChip()
                    : null
                }
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
        <Menu open={this.state.menuOpen} onClose={this.handleMenuClose} />
      </AppBar>
    ) 
  }

  renderCancelEditingChip() {
    return (
      <Chip {...this.getCancelEditingChipProps()} />
    )
  }

  getMenuButtonProps() {
    return {
      color: "inherit", 
      onClick: this.handleMenuButtonClick
    }
  }

  getCancelEditingChipProps() {
    const classes = this.props.classes;

    return {
      className: classes.cancelediting,
      clickable: true,
      color: 'primary',
      icon: <CancelIcon />,
      label: 'Stop Editing',
      onClick: this.handleCancelEditingClick
    }
  }

  handleMenuButtonClick() {
    const setAppMenuOpen = this.props.actions.setAppMenuOpen

    if (setAppMenuOpen) {
      setAppMenuOpen(true)
    }
  }

  handleCancelEditingClick() {
    const setEditing = this.props.actions.setEditing
    
    if (setEditing) {
      setEditing()
    } 
  }

  handleMenuClose() {
    const setAppMenuOpen = this.props.actions.setAppMenuOpen

    if (setAppMenuOpen) {
      setAppMenuOpen(false)
    }
  }
}

export default injectSheet(styles)(Appbar)