import classnames from 'classnames'
import CardIcon from 'components/card-icon'
import styles from 'components/card-selector/card-cell/styles'
import TableCell from '@material-ui/core/TableCell'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class CardCell extends Component {

  static propTypes = {
    card: PropTypes.object,
    className: PropTypes.string
  }

  render() {
    return (
      <TableCell className={this.getClass()}>
        <CardIcon card={this.props.card} />
      </TableCell>
    ) 
  }

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(className, classes.cell)
  }
}

export default injectSheet(styles)(CardCell)