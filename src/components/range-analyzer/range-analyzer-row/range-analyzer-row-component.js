import Button from '@material-ui/core/Button'
import classnames from 'classnames'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react'
import {styles} from 'components/range-analyzer/range-analyzer-row/range-analyzer-row-styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

class RangeAnalyzerRow extends Component {

  constructor(props) {
    super(props)

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleExpandButtonClick = this.handleExpandButtonClick.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)

    this.state = {
      expanded: false
    }
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
    selected: PropTypes.bool
  }

  render() {
    const {
      classes,
      rangeAnalysis = {},
    } = this.props

    return (
      <Fragment>
        <TableRow className={classes.row} onClick={this.handleClick}>
          {this.renderNameCell()}
          {this.renderPercentageCell('handsRatio')}
          {this.renderCell(rangeAnalysis.combosCount, 'right', classes.analysisCell)}
          {this.renderPercentageCell('rangeRatio')}
          <TableCell className={this.getCellClass(classes.buttonsCell)} align="right">
            {this.renderClearButton()}
            {this.renderExpandButton()}
          </TableCell>
        </TableRow>
        {this.renderDetails()}
      </Fragment>
    ) 
  }

  renderNameCell() {
    return (
      <TableCell className={this.getCellClass(this.props.classes.nameCell)} align='left'>
        <Input {...this.getNameInputProps()} />
      </TableCell>
    )
  }

  renderCell(content, align = 'right', additionalClasses) {
    return (
      <TableCell className={this.getCellClass(additionalClasses)} align={align}>
        {content}
      </TableCell>
    )
  }

  renderPercentageCell(ratioName) {
    const { 
      classes,
      rangeAnalysis
    } = this.props
    let content = null

    if (rangeAnalysis) {
      content = (rangeAnalysis[ratioName] * 100).toFixed(1) + '%'
    }

    return this.renderCell(content, 'right', classes.analysisCell)
  }

  renderClearButton() {
    return (
      <Button className={this.props.classes.clear} onClick={this.handleClearButtonClick}>
        Clear
      </Button>
    )
  }

  renderExpandButton() {
    return (
      <IconButton className={this.props.classes.button} onClick={this.handleExpandButtonClick}>
        <ExpandMoreIcon />
      </IconButton>
    )
  }

  renderDetails() {
    let classes = this.props.classes
    let component = null

    if (this.state.expanded) {
      component = (
        <TableRow className={classes.row}>
          <TableCell colSpan={4} className={classes.output}>
            {this.props.rangeOutput}
          </TableCell>
          <TableCell align="right">
            <IconButton className={classes.button}>
              <FileCopyIcon />
            </IconButton>
          </TableCell>
        </TableRow> 
      )
    }

    return component
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

  getCellClass(additionalClasses) {
    const classes = this.props.classes

    return classnames(classes.analysis, additionalClasses, {
      [classes.expanded]: this.state.expanded
    })
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

  handleClearButtonClick() {
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

  handleExpandButtonClick() {
    this.setState({
      expanded: !this.state.expanded
    })
  }
}

export default injectSheet(styles)(RangeAnalyzerRow)