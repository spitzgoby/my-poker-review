import RangeAnalysisCell from 'components/range-row/analysis-cell'
import RangeEditCell from 'components/range-row/edit-cell'
import RangeNameCell from 'components/range-row/name-cell'
import RangeRowCell from 'components/range-row/cell'
import {styles} from 'components/range-row/styles'
import {modes} from 'lib/application-constants'
import Hidden from '@material-ui/core/Hidden'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerRow extends Component {

  constructor(props) {
    super(props)

    this.handleClear = this.handleClear.bind(this)
    this.handleClick = this.handleClick.bind(this)
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
    mode: PropTypes.oneOf([modes.EQUITY, modes.RANGES]),
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
    const {
      classes,
      mode
    }  = this.props

    return (
      <TableRow className={classes.row} onClick={this.handleClick}>
        <RangeNameCell {...this.getNameCellProps()} />
        {mode === 'equity' ? this.renderEquityCells() : this.renderAnalysisCells()}
      </TableRow>
    ) 
  }

  renderEquityCells() {
    return (
      <Fragment>
        <Hidden smDown>
          <RangeRowCell {...this.getOutputCellProps()}>
            {this.props.rangeOutput}
          </RangeRowCell>
        </Hidden>
        <RangeAnalysisCell {...this.getEquityCellProps()} />
      </Fragment>
    )
  }

  renderAnalysisCells() {
    return (
      <Fragment>
        <Hidden xsDown>
          <RangeAnalysisCell {...this.getAnalysisCellProps('handsRatio', 'ratio')} />
        </Hidden>
        <RangeAnalysisCell {...this.getAnalysisCellProps('combosCount', 'count')} />
        <RangeAnalysisCell {...this.getAnalysisCellProps('rangeRatio', 'ratio')} />
        <RangeEditCell {...this.getEditCellProps()} />
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

  getNameCellProps() {
    return {
      ...this.getDefaultCellProps(),
      onNameChange: this.handleNameChange,
      width: '26%'
    } 
  }

  getOutputCellProps() {
    return {}
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

  getEquityCellProps() {
    return {
      ...this.getDefaultCellProps(),
      type: 'ratio',
      value: this.props.equity.win
    }
  }

  getEditCellProps() {
    const {
      editing,
    } = this.props

    return {
      ...this.getDefaultCellProps(),
      editing,
      onClear: this.handleClear,
      onDelete: this.handleDelete,
      onExpand: this.handleExpand,
      width: '20%'
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
      selected
    } = this.props

    return {
      editing,
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
}

export default injectSheet(styles)(RangeAnalyzerRow)