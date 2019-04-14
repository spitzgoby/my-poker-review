import Clipboard from 'util/clipboard'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import {
  RangeAnalyzerAnalysisCell,
  RangeAnalyzerCopyCell,
  RangeAnalyzerEditCell,
  RangeAnalyzerNameCell,
  RangeAnalyzerOutputCell
} from 'components/range-analyzer/cell'
import React, {Component, Fragment} from 'react'
import {styles} from 'components/range-analyzer/row/range-analyzer-row-styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

class RangeAnalyzerRow extends Component {

  constructor(props) {
    super(props)

    this.handleClear = this.handleClear.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCopy = this.handleCopy.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)

    this.state = {
      expanded: false
    }
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

  componentWillUpdate(newProps) {
    if (this.state.expanded && !newProps.rangeOutput) {
      this.setState({
        expanded: false
      })
    }
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
    let classes = this.props.classes
    let component = null

    if (this.state.expanded) {
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
      expandable: (rangeOutput),
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
      range,
      selected
    } = this.props

    return {
      expanded: this.state.expanded,
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

  handleExpand() {
    this.setState({
      expanded: !this.state.expanded
    })
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