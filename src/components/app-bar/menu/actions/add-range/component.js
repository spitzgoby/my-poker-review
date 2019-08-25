import ColorBlock from 'components/app-bar/color-block'
import styles from 'components/app-bar/menu/actions/add-range/styles'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React, {
  Component,
  Fragment
} from 'react'
import injectSheet from 'react-jss'
import {rangeColorList} from 'styles/colors/range-colors'

class AddRange extends Component {

  static propTypes = {
    actions: PropTypes.shape({
      addRange: PropTypes.func
    }).isRequired
  }

  render() {
    return (
      <Fragment>
        <ListSubheader>
          Add Range
        </ListSubheader>
        {rangeColorList.map(color => this.renderMenuItem(color.name))}
      </Fragment>
    ) 
  }

  renderMenuItem(color) {
    return (
      <ListItem key={color} onClick={() => this.handleMenuItemClick(color)}>
        <ColorBlock color={color} />
        <ListItemText>{color}</ListItemText>
      </ListItem>
    )
  }

  handleMenuItemClick(color) {
    const addRange = this.props.actions.addRange

    if (addRange) {
      addRange({color})
    }
  }
}

export default injectSheet(styles)(AddRange)