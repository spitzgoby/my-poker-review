import Dropzone from 'components/dropzone'
import styles from 'components/app-bar/toolbar/import-range-dialog/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

class ImportRangeDialog extends Component {

  constructor(props) {
    super(props)

    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleDropzoneChange = this.handleDropzoneChange.bind(this)
    this.handleImportButtonClick = this.handleImportButtonClick.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      onClose: PropTypes.func,
      onFileChange: PropTypes.func,
      onImport: PropTypes.func
    }).isRequired,
    file: PropTypes.object,
    importing: PropTypes.bool,
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
      onClick: this.handleImportButtonClick,
      variant: 'contained'
    }
  }

  handleDialogClose() {
    const onClose = this.props.actions.onClose

    if (onClose) {
      onClose()
    }
  }

  handleDropzoneChange(file) {
    const onFileChange = this.props.actions.onFileChange

    if (onFileChange) {
      onFileChange(file)
    }
  }

  handleImportButtonClick() {
    const onImport = this.props.actions.onImport

    if (onImport) {
      onImport(this.props.file)
    }
  }
}

export default injectSheet(styles)(ImportRangeDialog)