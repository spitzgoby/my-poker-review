import classnames from 'classnames'
import styles from 'components/range-analyzer/cell/styles'
import TableCell from '@material-ui/core/TableCell'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeAnalyzerCell extends Component {

  static propTypes = {
    align: PropTypes.align,
    className: PropTypes.string,
    colSpan: PropTypes.number
  }

  render() {
    return (
      <TableCell {...this.getProps()}>
        {this.props.children}
      </TableCell>
    ) 
  }

  getProps() {
    return {
      ...this.props,
      className: this.getClass()
    }
  }

  getClass() {
    const {
      classes,
      className
    } = this.props

    return classnames(classes.root, className)
  }
}

export default injectSheet(styles)(RangeAnalyzerCell)