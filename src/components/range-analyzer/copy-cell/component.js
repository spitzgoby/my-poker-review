import styles from 'components/range-analyzer/copy-cell/styles'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerCopyCell extends Component {

  constructor(props) {
    super(props)

    this.handleCopyButtonClick = this.handleCopyButtonClick.bind(this)
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
      <TableCell className={classes.cell} align="right"> 
        <Tooltip title="Copy range text to clipboard">
          <IconButton {...this.getCopyButtonProps()}>
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    ) 
  }

  getCopyButtonProps() {
    return {
      className: this.props.classes.copy,
      onClick: this.handleCopyButtonClick,
      toolTip: 'Copy range text to clipboard'
    }
  }

  handleCopyButtonClick() {
    const onCopy = this.props.onCopy
    
    if (onCopy) {
      onCopy()
    } 
  }
}

export default injectSheet(styles)(RangeAnalyzerCopyCell)