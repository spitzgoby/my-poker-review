import Menu from 'components/app-bar/menu'
import AppBarToolbar from 'components/app-bar/toolbar'
import styles from 'components/app-bar/styles'
import {modes} from 'lib/application-constants'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Appbar extends Component {

  constructor(props) {
    super(props)

    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)

    this.state = {
      menuOpen: false
    }
  }

  render() {
    const {
      classes,
      mode
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
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
        <Menu open={this.state.menuOpen} onClose={this.handleMenuClose} />
      </AppBar>
    ) 
  }

  getMenuButtonProps() {
    return {
      color: "inherit", 
      onClick: this.handleMenuButtonClick
    }
  }

  handleMenuButtonClick() {
    this.setState({
      menuOpen: true
    })
  }

  handleMenuClose() {
    this.setState({
      menuOpen: false
    })
  }
}

export default injectSheet(styles)(Appbar)