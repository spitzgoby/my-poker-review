import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import ImportExportIcon from '@material-ui/icons/ImportExport'
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
    this.handleImportExportButtonClick = this.handleImportExportButtonClick.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)

    this.state = {
      anchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onAddRange: PropTypes.func
    }).isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired
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
            {this.renderAddMenu()}
            {this.renderImportExportButton()}
            {this.renderAddButton()}
          </Grid>
        </Grid>
      </Toolbar>
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
    const anchorEl = this.state.anchorEl

    return (
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={this.handleMenuClose}>
        {rangeColorList.map((color) => {
          return this.renderAddMenuItem(color.name)
        })}
      </Menu>
    )
  }

  renderAddMenuItem(color) {
    return (
      <Tooltip key={color} title={`Add a new ${color} range`}>
        <MenuItem onClick={() => this.handleMenuItemClick(color)}>
          <RangeColorBlock color={color} />
        </MenuItem>
      </Tooltip>
    )
  }

  getImportExportButtonProps() {
    return {
      'aria-label': 'Download',
      className: this.props.classes.button,
      onClick: this.handleImportExportButtonClick
    }
  }

  getAddButtonProps() {
    return {
      'aria-label': 'Add',
      className: this.props.classes.button,
      onClick: this.handleAddButtonClick
    }
  }

  handleMenuClose() {
    this.setState({
      anchorEl: null
    })
  }

  handleMenuItemClick(color) {
    const onAddRange = this.props.actions.onAddRange

    if (onAddRange) {
      onAddRange({color})
    }
  }

  handleImportExportButtonClick(event) {
    console.log(event)
  }

  handleAddButtonClick(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }
}

export default injectSheet(styles)(RangeAnalyzerToolbar)