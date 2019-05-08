import styles from 'components/range-analyzer/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerHeader extends Component {

  constructor(props) {
    super(props)

    this.handleClearCombosButtonClick = this.handleClearCombosButtonClick.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
  }

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">
            Hands (%)
          </TableCell>
          <TableCell align="right">
            Combos (#)
          </TableCell>
          <TableCell align="right">
            Range (%)
          </TableCell>
          <TableCell align="right">
            <Tooltip title="Clear all ranges">
              <Button onClick={this.handleClearCombosButtonClick}>
                Clear
              </Button>
            </Tooltip>
            {this.renderEditButton()}
          </TableCell>
        </TableRow>              
      </TableHead>
    ) 
  }

  renderEditButton() {
    const editing = this.props.editing
    const title = editing ? 'Cancel editing' : 'Edit ranges'

    return (
      <Tooltip title={title}>
        <IconButton onClick={this.handleEditButtonClick}>
          { editing
            ? <ClearIcon />
            : <EditIcon />
          }
        </IconButton>
      </Tooltip>
    )
  }

  handleClearCombosButtonClick() {
    const onClearCombos = this.props.actions.onClearCombos

    if (onClearCombos) {
      onClearCombos()
    }
  }

  handleEditButtonClick() {
    const onEdit = this.props.actions.onEdit

    if (onEdit) {
      onEdit()
    }
  }

}

export default injectSheet(styles)(RangeAnalyzerHeader)