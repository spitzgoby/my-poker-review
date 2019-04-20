import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/toolbar/import-range-dialog-styles'

class ImportRangeDialog extends Component {

  constructor(props) {
    super(props)

    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleFileImport = this.handleFileImport.bind(this)
    this.handleBrowseButtonClick = this.handleBrowseButtonClick.bind(this)
    this.setFileInputRef = this.setFileInputRef.bind(this)
  }

  static propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
  }

  render() {
    const classes = this.props.classes

    return (
      <Dialog {...this.getProps()}> 
        <DialogTitle>Import Ranges From File</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.text}>
            Drag a file here
          </DialogContentText>
          <DialogContentText className={classes.text}>
            or
          </DialogContentText>
          <Button {...this.getBrowseButtonProps()} >
            Browse Files
          </Button>
          <input {...this.getFileInputProps()} />
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
      onChange: this.handleFileImport,
      onClose: this.handleDialogClose,
      open: this.props.open
    }
  }

  getFileInputProps() {
    return {
      className: this.props.classes.fileinput,
      ref: this.setFileInputRef,
      type: "file"
    }
  }

  getBrowseButtonProps() {
    return {
      color: "secondary",  
      onClick: this.handleBrowseButtonClick,
      variant: "outlined" 
    }
  }

  getImportButtonProps() {
    return {
      color: "primary",
    }
  }

  setFileInputRef(element) {
    this.fileInputRef = element
  }

  handleFileImport(event) {
    console.log(event.target.files)
  }

  handleDialogClose() {
    const onClose = this.props.onClose

    if (onClose) {
      onClose()
    }
  }

  handleBrowseButtonClick() {
    if (this.fileInputRef) {
      this.fileInputRef.click() 
    }
  }
}

export default injectSheet(styles)(ImportRangeDialog)