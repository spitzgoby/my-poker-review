import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

class ExportRangeDialog extends Component {

  constructor(props) {
    super(props)

    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleExportButtonClick = this.handleExportButtonClick.bind(this)
    this.handleExportFileNameTextFieldChange = this.handleExportFileNameTextFieldChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      onClose: PropTypes.func,
      onExport: PropTypes.func,
      onFileChange: PropTypes.func
    }).isRequired,
    fileName: PropTypes.string,
    open: PropTypes.bool,
    ranges: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    return (
      <Dialog {...this.getProps()}>
        <DialogTitle>
          Export Ranges to File
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you do not provide a file extension then .json 
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
    const onClose = this.props.actions.onClose 

    if (onClose) {
      onClose()
    }
  }

  handleExportFileNameTextFieldChange(event) {
    const onFileChange = this.props.actions.onFileChange

    if (onFileChange) {
      onFileChange(event.target.value)
    }
  }

  handleExportButtonClick() {
    const { 
      actions: {
        onExport
      },
      fileName,
      rangeList
    } = this.props

    if (onExport) {
      onExport({rangeList, fileName})
    }
  }
}

export default ExportRangeDialog