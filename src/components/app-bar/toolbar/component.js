import Clipboard from 'util/clipboard'
import AddRangeMenu from 'components/app-bar/toolbar/add-range-menu'
import ExportRangeDialog from 'components/app-bar/toolbar/export-range-dialog'
import ImportRangeDialog from 'components/app-bar/toolbar/import-range-dialog'
import styles from 'components/app-bar/toolbar/styles'
import {
  inputModes,
  modes
} from 'lib/application-constants'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import BallotIcon from '@material-ui/icons/Ballot'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import KeyboardIcon from '@material-ui/icons/Keyboard'
import MouseIcon from '@material-ui/icons/Mouse'
import PieChartIcon from '@material-ui/icons/PieChart'
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
    this.handleInputModeSwitchChange = this.handleInputModeSwitchChange.bind(this)
    this.handleModeSwitchChange = this.handleModeSwitchChange.bind(this)

    this.state = {
      addAnchorEl: null,
      importExportAnchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onAddRange: PropTypes.func,
      onEdit: PropTypes.func,
      onOpenAddRangeMenu: PropTypes.func,
      onOpenExportDialog: PropTypes.func,
      onOpenImportDialog: PropTypes.func
    }).isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired,
    inputMode: PropTypes.oneOf([inputModes.CARD, inputModes.TEXT]),
    mode: PropTypes.oneOf([modes.EQUITY, modes.RANGES]),
    ranges: PropTypes.arrayOf(PropTypes.object),
    selectedRangeOutput: PropTypes.string
  }

  render() {
    const {
      classes,
      mode
    } = this.props

    return (
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
            {this.renderModeSwitch()}
            {this.renderInputModeSwitch()}
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

  renderModeSwitch() {
    return (
      <Tooltip title={this.renderModeTitle()}>
        <Switch {...this.getModeSwitchProps()} />
      </Tooltip>
    )
  }

  renderInputModeSwitch() {
    return (
      <Tooltip title={this.renderInputModeTitle()}>
        <Switch {...this.getInputModeSwitchProps()} />
      </Tooltip>
    )
  }

  renderModeTitle() {
    const isEquityMode = this.props.mode === modes.EQUITY
    const modeName = isEquityMode ? 'Equity Mode' : 'Ranges Mode'
    const otherModeName = isEquityMode ? 'Ranges Mode' : 'Equity Mode'

    return (
      <div>
        <b>{modeName}</b>
        <br />
        Click to switch to {otherModeName}
      </div>
    )
  }

  renderInputModeTitle() {
    const isTextMode = this.props.inputMode === inputModes.TEXT
    const modeName = isTextMode ? 'Type Cards' : 'Select Cards' 
    const otherModeName = isTextMode ? 'select cards' : 'text input' 

    return (
      <div>
        <b>{modeName}</b>
        <br />
        Click to switch to {otherModeName}
      </div>
    )
  }

  renderCopyButton() {
    return (
      <Tooltip title="Copy selected range">
        <div className={this.props.classes.wrapper}>
          <IconButton {...this.getCopyButtonProps()}>
            <FileCopyIcon />
          </IconButton>
        </div>
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
        <IconButton {...this.getEditButtonProps()}>
          { editing
            ? <ClearIcon />
            : <EditIcon />
          }
        </IconButton>
      </Tooltip>
    )
  }

  getModeSwitchProps() {
    return {
      checked: this.props.mode === modes.RANGES,
      checkedIcon: <BallotIcon />,
      color: 'default',
      icon: <PieChartIcon />,
      onChange: this.handleModeSwitchChange
    }
  }

  getInputModeSwitchProps() {
    return {
      checked: this.props.inputMode === inputModes.TEXT,
      checkedIcon: <KeyboardIcon />,
      color: 'default',
      icon: <MouseIcon />,
      onChange: this.handleInputModeSwitchChange
    }
  }

  getCopyButtonProps() {
    return {
      className: this.props.classes.button,
      disabled: !this.props.selectedRangeOutput,
      onClick: this.handleCopyButtonClick
    }
  }

  getCopySnackbarProps() {
    return {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top'
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
      className: this.props.classes.button,
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
      className: this.props.classes.button,
      onClick: this.handleAddButtonClick
    }
  }

  getEditButtonProps() {
    return {
      className: this.props.classes.button,
      onClick: this.handleEditButtonClick
    }
  }

  handleModeSwitchChange(event) {
    const checked = event.target.checked
    const mode = checked
      ? modes.RANGES
      : modes.EQUITY
    const setMode = this.props.actions.setMode

    if (setMode) {
      setMode(mode)
    }
  }

  handleInputModeSwitchChange(event) {
    const inputMode = event.target.checked
      ? inputModes.TEXT
      : inputModes.CARD
    const setInputMode = this.props.actions.setInputMode

    if (setInputMode) {
      setInputMode(inputMode)
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