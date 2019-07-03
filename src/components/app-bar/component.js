import Menu from 'components/app-bar/menu'
import AppBarToolbar from 'components/app-bar/toolbar'
import styles from 'components/app-bar/styles'
import AppBar from '@material-ui/core/AppBar'
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
        <AppBarToolbar />
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