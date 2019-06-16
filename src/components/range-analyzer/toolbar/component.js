import Clipboard from 'util/clipboard'
import AddRangeMenu from 'components/range-analyzer/toolbar/add-range-menu'
import ExportRangeDialog from 'components/range-analyzer/toolbar/export-range-dialog'
import ImportRangeDialog from 'components/range-analyzer/toolbar/import-range-dialog'
import styles from 'components/range-analyzer/toolbar/styles'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerToolbar extends Component {

  constructor(props) {
    super(props)

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this)
    this.handleCopyButtonClick = this.handleCopyButtonClick.bind(this)
    this.handleCopySnackbarClose = this.handleCopySnackbarClose.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.handleExportMenuItemClick = this.handleExportMenuItemClick.bind(this)
    this.handleImportExportButtonClick = this.handleImportExportButtonClick.bind(this)
    this.handleImportExportMenuClose = this.handleImportExportMenuClose.bind(this)
    this.handleImportMenuItemClick = this.handleImportMenuItemClick.bind(this)

    this.state = {
      addAnchorEl: null,
      importExportAnchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onAddRange: PropTypes.func,
      onOpenExportDialog: PropTypes.func,
      onOpenImportDialog: PropTypes.func
    }).isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired,
    ranges: PropTypes.arrayOf(PropTypes.object),
    selectedRangeOutput: PropTypes.string
  }

  render() {
    const classes = this.props.classes

    return (
      <Toolbar className={classes.toolbar}>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography className={classes.title} variant="h5">
              Ranges
            </Typography>
          </Grid>
          <Grid item>
            {this.renderCopyButton()}
            {this.renderCopySnackbar()}
            {this.renderImportExportMenu()}
            {this.renderImportExportButton()}
            <ImportRangeDialog />
            <ExportRangeDialog />
            <AddRangeMenu anchorEl={this.state.addAnchorEl} />
            {this.renderAddButton()}
            {this.renderEditButton()}
          </Grid>
        </Grid>
      </Toolbar>
    ) 
  }

  renderCopyButton() {
    return (
      <Tooltip title="Copy selected range">
        <IconButton {...this.getCopyButtonProps()}>
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
    )
  }

  renderCopySnackbar() {
    return (
      <Snackbar {...this.getCopySnackbarProps()}> 
      </Snackbar>
    )
  }

  renderImportExportMenu() {
    return (
      <Menu {...this.getImportExportMenuProps()} >
        <MenuItem onClick={this.handleImportMenuItemClick}>
          Import a range from a file
        </MenuItem>
        <MenuItem onClick={this.handleExportMenuItemClick}>
          Export the current range to a file
        </MenuItem>
      </Menu>
    )
  }

  renderImportExportButton() {
    return (
      <Tooltip title="Import/Export ranges">
        <IconButton {...this.getImportExportButtonProps()}>
          <ImportExportIcon />
        </IconButton>
      </Tooltip>
    )
  }

  renderAddButton() {
    return (
      <Tooltip title="Add a new range">
        <IconButton {...this.getAddButtonProps()}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    )
  }
  
  renderEditButton() {
    const editing = this.props.editing
    const title = editing ? 'Cancel editing' : 'Edit ranges'

    return (
      <Tooltip title={title}>
        <IconButton onClick={this.handleEditButtonClick}>
          { editing
            ? <ClearIcon />
            : <EditIcon />
          }
        </IconButton>
      </Tooltip>
    )
  }

  getCopyButtonProps() {
    return {
      onClick: this.handleCopyButtonClick
    }
  }

  getCopySnackbarProps() {
    return {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom'
      },
      autoHideDuration: 2000,
      ContentProps: {
        className: this.props.classes.snackbar
      },
      message: 'Range copied to clipboard',
      onClose: this.handleCopySnackbarClose,
      open: this.state.copySnackbarOpen,
      variant: 'success'
    }
  }

  getImportExportMenuProps() {
    const importExportAnchorEl = this.state.importExportAnchorEl

    return {
      anchorEl: importExportAnchorEl,
      open: !!importExportAnchorEl,
      onClick: this.handleImportExportMenuClose
    }    
  }

  getImportExportButtonProps() {
    return {
      'aria-label': 'Download',
      onClick: this.handleImportExportButtonClick
    }
  }

  getExportButtonProps() {
    return {
      onClick: this.handleExportButtonClick,
    }
  }

  getAddButtonProps() {
    return {
      'aria-label': 'Add',
      onClick: this.handleAddButtonClick
    }
  }

  handleCopyButtonClick() {
    Clipboard.copy(this.props.selectedRangeOutput)

    this.setState({
      copySnackbarOpen: true
    })
  }

  handleCopySnackbarClose() {
    this.setState({
      copySnackbarOpen: false
    })   
  }

  handleImportExportMenuClose() {
    this.setState({
      importExportAnchorEl: null
    })
  }

  handleImportMenuItemClick() {
    const onOpenImportDialog = this.props.actions.onOpenImportDialog

    if (onOpenImportDialog) {
      onOpenImportDialog()
    }
  }

  handleExportMenuItemClick() {
    const onOpenExportDialog = this.props.actions.onOpenExportDialog

    if (onOpenExportDialog) {
      onOpenExportDialog()
    }
  }

  handleImportExportButtonClick(event) {
    this.setState({
      importExportAnchorEl: event.currentTarget
    })
  }

  handleAddButtonClick(event) {
    const onOpenAddRangeMenu = this.props.actions.onOpenAddRangeMenu

    if (!this.state.addAnchorEl) {
      this.setState({
        addAnchorEl: event.currentTarget
      })
    }

    if (onOpenAddRangeMenu) {
      onOpenAddRangeMenu()
    }
  }

  handleEditButtonClick() {
    const onEdit = this.props.actions.onEdit

    if (onEdit) {
      onEdit()
    }
  }

}

export default injectSheet(styles)(RangeAnalyzerToolbar)