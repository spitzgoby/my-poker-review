import styles from 'components/range-table/header/delete-all-dialog/styles'
import Dialog from '@material-ui/core/Dialog'
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
        Delete All Dialog
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