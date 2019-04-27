import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'

class ExportRangeDialog extends Component {

  constructor(props) {
    super(props)

    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleExportButtonClick = this.handleExportButtonClick.bind(this)
    this.handleExportFileNameTextFieldChange = this.handleExportFileNameTextFieldChange.bind(this)
  }

  static propTypes = {
    fileName: PropTypes.string,
    onClose: PropTypes.func,
    onExport: PropTypes.func,
    onFileNameChange: PropTypes.func,
    open: PropTypes.bool
  }

  render() {
    return (
      <Dialog {...this.getProps()}>
        <DialogTitle>
          Export Ranges to File
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you do not provide a file extension then json 
            will be used by default.
          </DialogContentText>
          <TextField {...this.getExportFileNameTextFieldProps()} />
        </DialogContent>
        <DialogActions>
          <Button {...this.getExportButtonProps()} >
            Export
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

  getExportFileNameTextFieldProps() {
    return {
      fullWidth: true, 
      label: "Filename", 
      onChange: this.handleExportFileNameTextFieldChange,
      value: this.props.fileName
    }
  }

  getExportButtonProps() {
    return {
      color: "primary",  
      onClick: this.handleExportButtonClick,
      variant: 'contained'
    }
  }

  handleDialogClose() {
    const onClose = this.props.onClose 

    if (onClose) {
      onClose()
    }
  }

  handleExportFileNameTextFieldChange(event) {
    const onFileNameChange = this.props.onFileNameChange    

    if (onFileNameChange) {
      onFileNameChange(event)
    }
  }

  handleExportButtonClick() {
    const onExport = this.props.onExport

    if (onExport) {
      onExport(this.props.fileName)
    }
  }
}

export default ExportRangeDialog