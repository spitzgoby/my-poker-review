import injectSheet from 'react-jss'
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import TableCell from '@material-ui/core/TableCell'
import {styles} from 'components/range-analyzer/cell/range-analyzer-name-cell-styles'

class RangeAnalyzerNameCell extends Component {

  static propTypes = {
    range: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string
    }),
    onNameChange: PropTypes.func
  }

  render() {
    return (
      <TableCell className={this.props.classes.cell} align='left'>
        <Input {...this.getNameInputProps()} />
      </TableCell>
    ) 
  }

  getNameInputProps() {
    const {
      classes,
      range
    } = this.props

    return {
      className: classes.input,
      onChange: this.handleNameChange,
      value: range.name
    }
  }

  handleNameChange(event) {
    const {
      actions: {
        onNameChange 
      }
    } = this.props

    if (onNameChange) {
      onNameChange(event.target.value)
    }
  }
}

export default injectSheet(styles)(RangeAnalyzerNameCell)