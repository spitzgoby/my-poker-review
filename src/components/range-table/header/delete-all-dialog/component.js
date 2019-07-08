import styles from 'components/range-table/header/delete-all-dialog/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class DeleteAllDialog extends Component {

  constructor(props) {
    super(props)

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      deleteAllRanges: PropTypes.func
    }).isRequired,
    open: PropTypes.bool
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}> 
        <DialogTitle>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete all of your current ranges and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <Button color="secondary" onClick={this.handleCancelClick}>
            Cancel
          </Button>
          <Button color="secondary" onClick={this.handleDeleteClick}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ) 
  }

  handleCancelClick() {
    this.handleClose()
  }

  handleDeleteClick() {
    const deleteAllRanges = this.props.actions.deleteAllRanges

    if (deleteAllRanges) {
      deleteAllRanges()
    }

    this.handleClose()
  }

  handleClose() {
    const setDeleteAllDialogOpen = this.props.actions.setDeleteAllDialogOpen

    if (setDeleteAllDialogOpen) {
      setDeleteAllDialogOpen(false)
    }
  }
}

export default injectSheet(styles)(DeleteAllDialog)