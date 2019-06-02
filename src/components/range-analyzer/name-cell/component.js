import RangeAnalyzerCell from 'components/range-analyzer/cell'
import {styles} from 'components/range-analyzer/name-cell/styles'
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerNameCell extends Component {

  constructor(props) {
    super(props)

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNameClick = this.handleNameClick.bind(this)
    this.setNameInputRef = this.setNameInputRef.bind(this)
  }

  static propTypes = {
    onNameChange: PropTypes.func,
    range: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string
    }),
    selected: PropTypes.bool
  }

  componentDidMount() {
    if (this.props.selected && this.nameInput) {
      this.nameInput.focus()
    }
  }

  render() {
    return (
      <RangeAnalyzerCell className={this.props.classes.cell} align='left'>
        <Input {...this.getNameInputProps()} />
      </RangeAnalyzerCell>
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
      onClick: this.handleNameClick,
      inputRef: this.setNameInputRef,
      value: range.name
    }
  }

  handleNameChange(event) {
    const onNameChange = this.props.onNameChange

    if (onNameChange) {
      onNameChange(event.target.value)
    }
  }

  handleNameClick(event) {
    event.stopPropagation()
  }

  setNameInputRef(component) {
    this.nameInput = component
  }
}

export default injectSheet(styles)(RangeAnalyzerNameCell)