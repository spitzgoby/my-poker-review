import styles from 'components/app-bar/menu/styles'
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
        </List>
      </Drawer>
    ) 
  }

  renderModeSubMenu() {
    const classes = this.props.classes

    return (
      <Fragment> 
        <ListItem>
          <ListItemText>
            Mode
          </ListItemText>
        </ListItem>
        <ListItem className={classes.nested} selected button>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText>Equity</ListItemText>
        </ListItem>
        <ListItem divider className={classes.nested} disabled button>
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
}

export default injectSheet(styles)(Menu)