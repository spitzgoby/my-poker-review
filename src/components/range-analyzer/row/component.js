import RangeAnalyzerCopyCell from 'components/range-analyzer/copy-cell'
import RangeAnalyzerAnalysisCell from 'components/range-analyzer/analysis-cell'
import RangeAnalyzerEditCell from 'components/range-analyzer/edit-cell'
import RangeAnalyzerNameCell from 'components/range-analyzer/name-cell'
import RangeAnalyzerOutputCell from 'components/range-analyzer/output-cell'
import {styles} from 'components/range-analyzer/row/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react'
import injectSheet from 'react-jss'
import Clipboard from 'util/clipboard'

class RangeAnalyzerRow extends Component {

  constructor(props) {
    super(props)

    this.handleClear = this.handleClear.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCopy = this.handleCopy.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      onDelete: PropTypes.func,
      onNameChange: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    editing: PropTypes.bool,
    range: PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    rangeAnalysis: PropTypes.shape({
      combosCount: PropTypes.number,
      handsRatio: PropTypes.number,
      rangeRation: PropTypes.number
    }),
    selected: PropTypes.bool
  }

  render() {
    const classes = this.props.classes

    return (
      <Fragment>
        <TableRow className={classes.row} onClick={this.handleClick}>
          <RangeAnalyzerNameCell {...this.getNameCellProps()} />
          <RangeAnalyzerAnalysisCell {...this.getAnalysisCellProps('handsRatio', 'ratio')} />
          <RangeAnalyzerAnalysisCell {...this.getAnalysisCellProps('combosCount', 'count')} />
          <RangeAnalyzerAnalysisCell {...this.getAnalysisCellProps('rangeRatio', 'ratio')} />
          <RangeAnalyzerEditCell {...this.getEditCellProps()} />
        </TableRow>
        {this.renderDetails()}
      </Fragment>
    ) 
  }

  renderCell(content, align = 'right', additionalClasses) {
    return (
      <TableCell className={this.getCellClass(additionalClasses)} align={align}>
        {content}
      </TableCell>
    )
  }

  renderDetails() {
    const { 
      classes,
      editing,
      rangeOutput
    } = this.props
    let component = null

    if (!editing && rangeOutput) {
      component = (
        <TableRow className={classes.row}>
          <RangeAnalyzerOutputCell {...this.getOutputCellProps()} />
          <RangeAnalyzerCopyCell {...this.getCopyCellProps()} />
        </TableRow> 
      )
    }

    return component
  }

  getNameCellProps() {
    return {
      ...this.getDefaultCellProps(),
      onNameChange: this.handleNameChange,
      width: '26%'
    } 
  }

  getAnalysisCellProps(property, type) {
    const {rangeAnalysis = {}} = this.props

    return {
      ...this.getDefaultCellProps(),
      type,
      value: rangeAnalysis[property],
      width: '18%'
    }
  }

  getEditCellProps() {
    const {
      editing,
      rangeOutput
    } = this.props

    return {
      ...this.getDefaultCellProps(),
      editing,
      expandable: !!rangeOutput,
      onClear: this.handleClear,
      onDelete: this.handleDelete,
      onExpand: this.handleExpand,
      width: '20%'
    }
  }

  getOutputCellProps() {
    return {
      ...this.getDefaultCellProps(),
      rangeOutput: this.props.rangeOutput,
      width: '80%'
    }
  }

  getCopyCellProps() {
    return {
      ...this.getDefaultCellProps(),
      onCopy: this.handleCopy,
      width: '20%'
    }
  }

  getDefaultCellProps() {
    const {
      editing,
      range,
      rangeOutput,
      selected
    } = this.props

    return {
      editing,
      expanded: !!rangeOutput,
      range,
      selected
    }
  }

  handleClick() {
    const {
      actions: {
        onSelect
      },
      range
    } = this.props

    if (onSelect) {
      onSelect({id: range.id})
    }
  }

  handleNameChange(name) {
    const {
      actions: {
        onNameChange,
      },
      range
    } = this.props

    if (onNameChange) {
      onNameChange({id: range.id, name: name})
    }
  }

  handleClear() {
    const {
      actions: {
        onClearButtonClick
      },
      range
    } = this.props

    if (onClearButtonClick) {
      onClearButtonClick({id: range.id})
    }
  }

  handleDelete() {
    const {
      actions: {
        onDelete
      },
      range
    } = this.props

    if (onDelete) {
      onDelete({id: range.id})
    }   
  }


  handleCopy() {
    Clipboard.copy(this.props.rangeOutput)
  }
}

export default injectSheet(styles)(RangeAnalyzerRow)