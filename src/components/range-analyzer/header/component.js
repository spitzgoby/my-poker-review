import RangeAnalyzerCell from 'components/range-analyzer/cell'
import RangeAnalyzerEditCell from 'components/range-analyzer/edit-cell'
import Fade from '@material-ui/core/Fade'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {themeColors} from 'styles/colors'

class RangeAnalyzerHeader extends Component {

  constructor(props) {
    super(props)

    this.handleClearCombosButtonClick = this.handleClearCombosButtonClick.bind(this)
    this.handleDeleteAllClick = this.handleDeleteAllClick.bind(this)
  }

  static propTypes = {
    className: PropTypes.string,
    editing: PropTypes.bool
  }

  render() {
    const editing = this.props.editing

    return (
      <TableHead>
        <TableRow>
          <RangeAnalyzerCell>Name</RangeAnalyzerCell>
          <RangeAnalyzerCell align="right">
            <Fade in={!editing}>
              <span>Hands (%)</span>
            </Fade>
          </RangeAnalyzerCell>
          <RangeAnalyzerCell align="right">
            <Fade in={!editing}>
              <span>Combos (#)</span>
            </Fade>
          </RangeAnalyzerCell>
          <RangeAnalyzerCell align="right">
            <Fade in={!editing}>
              <span>Range (%)</span>
            </Fade>
          </RangeAnalyzerCell>
          <RangeAnalyzerEditCell {...this.getEditCellProps()} />
        </TableRow>              
      </TableHead>
    ) 
  }

  getEditCellProps() {
    const editing = this.props.editing

    return {
      color: editing ? themeColors.error : themeColors.darkText,
      editing: editing,
      onClear: this.handleClearCombosButtonClick,
      onDelete: this.handleDeleteAllClick 
    }
  }

  handleClearCombosButtonClick() {
    const onClearCombos = this.props.actions.onClearCombos

    if (onClearCombos) {
      onClearCombos()
    }
  }

  handleDeleteAllClick() {
    console.log('delete all clicked')
  }
}

export default (RangeAnalyzerHeader)