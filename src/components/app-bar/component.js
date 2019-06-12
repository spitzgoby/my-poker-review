import styles from 'components/app-bar/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Appbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" variant="h6">
            My Poker Review
          </Typography>
        </Toolbar>
      </AppBar>
    ) 
  }
}

export default injectSheet(styles)(Appbar)