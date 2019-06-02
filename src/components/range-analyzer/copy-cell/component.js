import RangeAnalyzerCell from 'components/range-analyzer/cell'
import styles from 'components/range-analyzer/copy-cell/styles'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Tooltip from '@material-ui/core/Tooltip'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerCopyCell extends Component {

  constructor(props) {
    super(props)

    this.handleCopyButtonClick = this.handleCopyButtonClick.bind(this)
    this.handleRangeCopiedMessageClose = this.handleRangeCopiedMessageClose.bind(this)

    this.state = {
      rangeCopiedOpen: false
    }
  }

  static propTypes = {
    onCopy: PropTypes.func,
    range: PropTypes.shape({
      color: PropTypes.string
    }),
    selected: PropTypes.bool
  }

  render() {
    const {
      classes
    } = this.props

    return (
      <RangeAnalyzerCell className={classes.cell} align="right"> 
        <Tooltip title="Copy range text to clipboard">
          <IconButton {...this.getCopyButtonProps()}>
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
        <Snackbar {...this.getRangeCopiedMessageProps()}>
          <SnackbarContent {...this.getRangeCopiedMessageContentProps()} />
        </Snackbar>
      </RangeAnalyzerCell>
    ) 
  }

  getCopyButtonProps() {
    return {
      className: this.props.classes.copy,
      onClick: this.handleCopyButtonClick
    }
  }

  getRangeCopiedMessageProps() {
    return {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top'
      },
      autoHideDuration: 2000,
      onClose: this.handleRangeCopiedMessageClose,
      open: this.state.rangeCopiedOpen
    }
  }

  getRangeCopiedMessageContentProps() {
    return {
      className: this.props.classes.message,
      message: 'The range has been copied to your clipboard'
    }
  }

  handleCopyButtonClick() {
    const onCopy = this.props.onCopy
    
    if (onCopy) {
      onCopy()
    } 

    this.setState({
      rangeCopiedOpen: true
    })
  }

  handleRangeCopiedMessageClose() {
    this.setState({
      rangeCopiedOpen: false
    })
  }
}

export default injectSheet(styles)(RangeAnalyzerCopyCell)