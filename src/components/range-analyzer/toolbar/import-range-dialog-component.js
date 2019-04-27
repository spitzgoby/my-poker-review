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
    this.handleFileImport = this.handleFileImport.bind(this)
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
          <Dropzone />
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

  getImportButtonProps() {
    return {
      color: "primary",
      variant: 'contained'
    }
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
}

export default injectSheet(styles)(ImportRangeDialog)