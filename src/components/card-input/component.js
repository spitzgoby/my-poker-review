import styles from 'components/card-input/styles'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class CardInput extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
    this.setInputRef = this.setInputRef.bind(this)
  }

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
  }

  render() {
    return (
      <TextField {...this.getTextFieldProps()} />
    ) 
  }

  renderClearButton() {
    return (
      <Fade in={!!this.props.value}>
        <InputAdornment position="end">
          <IconButton onClick={this.handleClearButtonClick}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      </Fade>
    )
  }

  getTextFieldProps() {
    const { 
      className,
      label,
      maxLength,
      value
    } = this.props

    return {
      className,
      fullWidth: true,
      inputProps: {
        maxLength
      },
      InputProps: {
        endAdornment: this.renderClearButton(),
      },
      inputRef: this.setInputRef,
      label,
      onChange: this.handleChange,
      value
    }
  }

  handleChange(event) {
    this.updateInput(event.target.value)
  }

  handleClearButtonClick(event) {
    this.updateInput('')

    this.focusInput()
  }

  updateInput(value) {
    const {
      onChange
    } = this.props

    if (onChange) {
      onChange(value)
    }
  }

  setInputRef(component) {
    this.input = component
  }

  focusInput() {
    this.input.focus()
  }
}

export default injectSheet(styles)(CardInput)