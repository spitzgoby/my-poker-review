import AddRange from 'components/app-bar/menu/actions/add-range'
import styles from 'components/app-bar/menu/actions/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import PropTypes from 'prop-types'
import React, {
  Component,
  Fragment
} from 'react'
import injectSheet from 'react-jss'

class Actions extends Component {

  constructor(props) {
    super(props)

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)

    this.state = {
      addRangeAnchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      addRange: PropTypes.func,
      setAppMenuOpen: PropTypes.func,
      setEditing: PropTypes.func
    }).isRequired,
    editing: PropTypes.bool
  }

  render() {
    return this.state.addRangeMenuOpen
      ? this.renderAddRangeSubMenu()
      : this.renderMainMenu()
  }

  renderMainMenu() {
    return (
      <Fragment>
        <ListSubheader>
          Actions
        </ListSubheader>
        <ListItem {...this.getAddButtonProps()}>
          <ListItemIcon >
            <AddIcon />
          </ListItemIcon>
          <ListItemText>Add Range</ListItemText>
        </ListItem>
        <ListItem {...this.getEditButtonProps()}>
          {
            this.props.editing
              ? this.renderStopEditingRangesMenuItem()
              : this.renderEditRangesMenuItem()
          }
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ImportExportIcon />
          </ListItemIcon>
          <ListItemText>Import/Export</ListItemText>
        </ListItem>
      </Fragment>
    )
  }

  renderEditRangesMenuItem() {
    return (
      <Fragment>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText>Edit Ranges</ListItemText>
      </Fragment>
    )
  }

  renderStopEditingRangesMenuItem() {
    return (
      <Fragment>
        <ListItemIcon>
          <CancelIcon />
        </ListItemIcon>
        <ListItemText>Stop Editing</ListItemText>
      </Fragment>
    )
  }

  renderAddRangeSubMenu() {
    return <AddRange />
  } 

  getAddButtonProps() {
    return {
      button: true,
      onClick: this.handleAddButtonClick
    }
  }

  getEditButtonProps() {
    return {
      button: true,
      onClick: this.handleEditButtonClick
    }
  }

  handleAddButtonClick() {
    this.setState({
      addRangeMenuOpen: true
    })
  }

  handleRangeAdded() {
    this.setState({
      addRangeMenuOpen:false
    })
  }

  handleEditButtonClick() {
    const {
      setAppMenuOpen,
      setEditing 
    } = this.props.actions

    if (setEditing) {
      setEditing()
    }

    if (setAppMenuOpen) {
      setAppMenuOpen(false)
    }
  }
}


export default injectSheet(styles)(Actions)