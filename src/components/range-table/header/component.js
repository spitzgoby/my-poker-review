import RangeEditCell from 'components/range-row/edit-cell'
import RangeRowCell from 'components/range-row/cell'
import styles from 'components/range-table/header/styles'
import {modes} from 'lib/application-constants'
import Fade from '@material-ui/core/Fade'
import Hidden from '@material-ui/core/Hidden'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react'
import injectSheet from 'react-jss'
import {themeColors} from 'styles/colors'

class RangeTableHeader extends Component {

  constructor(props) {
    super(props)

    this.handleClearCombosButtonClick = this.handleClearCombosButtonClick.bind(this)
  }

  static propTypes = {
    className: PropTypes.string,
    editing: PropTypes.bool,
    mode: PropTypes.oneOf([modes.EQUITY, modes.RANGES])
  }

  render() {
    const equityMode = this.props.mode === modes.EQUITY

    return (
      <TableHead>
        <TableRow>
          <RangeRowCell>{equityMode ? 'Opponent' : 'Name'}</RangeRowCell>
          { equityMode
            ? this.renderEquityCells()
            : this.renderRangeCells() 
          }
          <RangeEditCell {...this.getEditCellProps()} />
        </TableRow>              
      </TableHead>
    ) 
  }

  renderEquityCells() {
    const {
      classes,
      editing
    } = this.props

    return (
      <Fragment>
        <RangeRowCell align="right">
          <Fade in={!editing}>
            <span className={classes.strong}>
              <b>Equity</b> (Tie)
            </span>
          </Fade>
        </RangeRowCell>
      </Fragment>
    )
  }

  renderRangeCells() {
    const editing = this.props.editing

    return (
      <Fragment>
        <Hidden xsDown>
          <RangeRowCell align="right">
              <Fade in={!editing}>
                <span>Hands (%)</span>
              </Fade>
          </RangeRowCell>
        </Hidden>
        <RangeRowCell align="right">
          <Fade in={!editing}>
            <span>Combos (#)</span>
          </Fade>
        </RangeRowCell>
        <RangeRowCell align="right">
          <Fade in={!editing}>
            <span>Range (%)</span>
          </Fade>
        </RangeRowCell>
      </Fragment>
    )
  }

  getEditCellProps() {
    const editing = this.props.editing

    return {
      color: editing ? themeColors.error : themeColors.secondary,
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
}

export default injectSheet(styles)(RangeTableHeader)