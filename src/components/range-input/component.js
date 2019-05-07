import PropTypes from 'prop-types'
import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'

import 'components/range-input/range-input.scss'

class RangeInput extends Component {

  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    actions: PropTypes.shape({
      setPlayerHand: PropTypes.func
    }).isRequired,
    className: PropTypes.string
  }

  render() {
    return (
      <TextField {...this.getInputProps()}></TextField>
    )
  }

  getInputProps() {
    return {
      label: 'My Hand',
      onChange: this.handleInputChange,
      value: this.props.playerHand,
      variant: 'outlined'
    }
  }

  handleInputChange(event) {
    let setPlayerHand = this.props.actions.setPlayerHand

    if (setPlayerHand) {
      setPlayerHand({ value: event.target.value})
    }
  }
}

export default RangeInput