import Menu from 'components/app-bar/menu'
import styles from 'components/app-bar/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
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
    return (
      <AppBar>
        <Toolbar>
          <IconButton {...this.getMenuButtonProps()} >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" variant="h6">
            My Poker Review
          </Typography>
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