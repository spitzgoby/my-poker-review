import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {styles} from 'components/range-analyzer/range-analyzer-row/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

class RangeAnalyzerRow extends Component {

  constructor(props) {
    super(props)

    this.handleNameChange = this.handleNameChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      onNameChange: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    range: PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    rangeAnalysis: PropTypes.shape({
      combosCount: PropTypes.number,
      handsRatio: PropTypes.number,
      rangeRation: PropTypes.number
    }),
    rangeOutput: PropTypes.string
  }

  render() {
    const {
      classes,
      rangeAnalysis = {},
      rangeOutput
    } = this.props

    return (
      <TableRow className={classes.row}>
        <TableCell className={classes.cell} padding="checkbox">
          <Checkbox className={classes.cell}/>
        </TableCell>
        {this.renderNameCell()}
        {this.renderCell(rangeOutput, 'left')}
        {this.renderPercentageCell('handsRatio')}
        {this.renderCell(rangeAnalysis.combosCount)}
        {this.renderPercentageCell('rangeRatio')}
        <TableCell align="right">
          <Button className={classes.rangeclear}>
            Clear
          </Button>
        </TableCell>
      </TableRow>
    ) 
  }

  renderNameCell() {
    const classes = this.props.classes
    const cellClasses = classnames(classes.cell, classes.name)

    return (
      <TableCell className={cellClasses} align='left'>
        <Input {...this.getNameInputProps()} />
      </TableCell>
    )
  }

  renderCell(content, align = 'right', additionalClasses) {
    const classes = classnames(this.props.classes.cell, additionalClasses)

    return (
      <TableCell className={classes} align={align}>
        {content}
      </TableCell>
    )
  }

  renderPercentageCell(ratioName) {
    const rangeAnalysis = this.props.rangeAnalysis
    let content = null

    if (rangeAnalysis) {
      content = (rangeAnalysis[ratioName] * 100).toFixed(1) + '%'
    }

    return this.renderCell(content)
  }

  getNameInputProps() {
    const {
      classes,
      range
    } = this.props

    return {
      className: classes.editable,
      onChange: this.handleNameChange,
      value: range.name
    }
  }

  handleNameChange(event) {
    const {
      actions: {
        onNameChange 
      },
      range
    } = this.props

    if (onNameChange) {
      onNameChange({id: range.id, name: event.target.value})
    }
  }
}

export default injectSheet(styles)(RangeAnalyzerRow)