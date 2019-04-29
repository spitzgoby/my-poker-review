import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dropzone from 'components/dropzone'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/toolbar/import-range-dialog-styles'

class ImportRangeDialog extends Component {

  constructor(props) {
    super(props)

    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleDropzoneChange = this.handleDropzoneChange.bind(this)
    this.handleImportButtonClick = this.handleImportButtonClick.bind(this)

    this.state = {
      file: null
    }
  }

  static propTypes = {
    onImport: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool
  }

  render() {
    const classes = this.props.classes

    return (
      <Dialog {...this.getProps()}> 
        <DialogTitle>Import Ranges From File</DialogTitle>
        <DialogContent className={classes.content}>
          <Dropzone {...this.getDropzoneProps()} />
        </DialogContent>
        <DialogActions>
          <Button {...this.getImportButtonProps()} > 
            Import
          </Button>
        </DialogActions>
      </Dialog>
    ) 
  }

  getProps() {
    return {
      onClose: this.handleDialogClose,
      open: this.props.open
    }
  }

  getDropzoneProps() {
    return {
      onChange: this.handleDropzoneChange
    }
  }

  getImportButtonProps() {
    return {
      color: "primary",
      disabled: (!this.state.file),
      onClick: this.handleImportButtonClick,
      variant: 'contained'
    }
  }

  handleDialogClose() {
    const onClose = this.props.onClose

    if (onClose) {
      onClose()
    }
  }

  handleDropzoneChange(file) {
    this.setState({file})
  }

  handleImportButtonClick() {
    const onImport = this.props.onImport

    if (onImport) {
      onImport(this.state.file)
    }
  }
}

export default injectSheet(styles)(ImportRangeDialog)