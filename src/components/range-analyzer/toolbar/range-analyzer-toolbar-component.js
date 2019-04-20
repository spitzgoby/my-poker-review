import AddIcon from '@material-ui/icons/Add'
import {download} from 'util/download'
import ExportRangeDialog from 'components/range-analyzer/toolbar/export-range-dialog'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import ImportRangeDialog from 'components/range-analyzer/toolbar/import-range-dialog'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import RangeColorBlock from 'components/range-analyzer/range-color-block'
import {rangeColorList} from 'styles/colors/rangeColors'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/toolbar/range-analyzer-toolbar-styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

class RangeAnalyzerToolbar extends Component {

  constructor(props) {
    super(props)

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this)
    this.handleAddMenuClose = this.handleAddMenuClose.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleExportDialogClose = this.handleExportDialogClose.bind(this)
    this.handleExportMenuItemClick = this.handleExportMenuItemClick.bind(this)
    this.handleExportFileNameChange = this.handleExportFileNameChange.bind(this)
    this.handleImportDialogClose = this.handleImportDialogClose.bind(this)
    this.handleImportExportButtonClick = this.handleImportExportButtonClick.bind(this)
    this.handleImportExportMenuClose = this.handleImportExportMenuClose.bind(this)
    this.handleImportMenuItemClick = this.handleImportMenuItemClick.bind(this)

    this.state = {
      addAnchorEl: null,
      exportDialogOpen: false,
      importDialogOpen: false,
      importExportAnchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onAddRange: PropTypes.func
    }).isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired,
    ranges: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const classes = this.props.classes

    return (
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography className={classes.title} variant="h5">
              Range Analyzer
            </Typography>
          </Grid>
          <Grid item>
            {this.renderImportExportMenu()}
            {this.renderImportExportButton()}
            <ImportRangeDialog {...this.getImportRangeDialogProps() }/>
            <ExportRangeDialog {...this.getExportRangeDialogProps()} />
            {this.renderAddMenu()}
            {this.renderAddButton()}
          </Grid>
        </Grid>
      </Toolbar>
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

  renderAddMenu() {
    return (
      <Menu {...this.getAddMenuProps()}>
        {rangeColorList.map((color) => {
          return this.renderAddMenuItem(color.name)
        })}
      </Menu>
    )
  }

  renderAddMenuItem(color) {
    return (
      <Tooltip key={color} title={`Add a new ${color} range`}>
        <MenuItem onClick={() => this.handleAddMenuItemClick(color)}>
          <RangeColorBlock color={color} />
        </MenuItem>
      </Tooltip>
    )
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

  getImportRangeDialogProps() {
    return {
      onClose: this.handleImportDialogClose,
      open: this.state.importDialogOpen
    }
  }

  getExportRangeDialogProps() {
    return {
      fileName: this.props.exportFileName,
      open: this.state.exportDialogOpen,
      onClose: this.handleExportDialogClose,
      onExport: this.handleExport,
      onFileNameChange: this.handleExportFileNameChange
    }
  }

  getExportFileNameTextFieldProps() {
    return {
      fullWidth: true, 
      label: "Filename", 
      onChange: this.handleExportFileNameChange,
      value: this.props.exportFileName
    }
  }

  getExportButtonProps() {
    return {
      color: "primary",  
      onClick: this.handleExportButtonClick,
      variant: "contained" 
    }
  }

  getAddMenuProps() {
    const addAnchorEl = this.state.addAnchorEl

    return {
      anchorEl: addAnchorEl, 
      open: !!addAnchorEl,
      onClose: this.handleAddMenuClose
    }
  }

  getAddButtonProps() {
    return {
      'aria-label': 'Add',
      onClick: this.handleAddButtonClick
    }
  }

  handleImportExportMenuClose() {
    this.setState({
      importExportAnchorEl: null
    })
  }

  handleImportMenuItemClick() {
    this.setState({
      importDialogOpen: true
    })
  }

  handleExportMenuItemClick() {
    this.setState({
      exportDialogOpen: true
    })
  }

  handleImportDialogClose() {
    this.setState({
      importDialogOpen: false
    })
  }

  handleExportFileNameChange(event) {
    const onChangeFileName = this.props.actions.onChangeFileName    

    if (onChangeFileName) {
      onChangeFileName({fileName: event.target.value})
    }
  }

  handleExport() {
    const {
      exportFileName,
      ranges
    } = this.props

    download(ranges, exportFileName)
  }

  handleExportDialogClose() {
    this.setState({
      exportDialogOpen: false
    })
  }

  handleImportExportButtonClick(event) {
    this.setState({
      importExportAnchorEl: event.currentTarget
    })
  }

  handleAddMenuItemClick(color) {
    const onAddRange = this.props.actions.onAddRange

    this.setState({
      addAnchorEl: null
    })

    if (onAddRange) {
      onAddRange({color})
    }
  }

  handleAddMenuClose() {
    this.setState({
      addAnchorEl: null
    })
  }

  handleAddButtonClick(event) {
    this.setState({
      addAnchorEl: event.currentTarget
    })
  }
}

export default injectSheet(styles)(RangeAnalyzerToolbar)