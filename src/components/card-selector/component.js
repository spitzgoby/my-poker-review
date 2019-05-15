import styles from 'components/card-selector/styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class CardSelector extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {}

  render() {
    return (
      <div> 
        CardSelector
      </div>
    ) 
  }
}

export default injectSheet(styles)(CardSelector)