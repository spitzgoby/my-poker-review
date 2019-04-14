import FileCopyIcon from '@material-ui/icons/FileCopy'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/range-analyzer/cell/range-analyzer-copy-cell-styles'
import TableCell from '@material-ui/core/TableCell'

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
          <IconButton className={classes.copy} onClick={this.handleCopyButtonClick}>
            <FileCopyIcon />
          </IconButton>
      </TableCell>
    ) 
  }

  getCopyButtonProps() {
    return {
      className: this.props.classes.copy,
      onClick: this.handleCopyButtonClick
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