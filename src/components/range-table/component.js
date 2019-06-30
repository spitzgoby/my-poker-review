import styles from 'components/range-table/styles'
import RangeTableHeader from 'components/range-table/header'
import RangeRow from 'components/range-row'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class RangeTable extends Component {

  static propTypes = {
    editing: PropTypes.bool,
    rangeList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string
    }))
  }

  render() {
    return (
      <Table>
        <RangeTableHeader />
        <TableBody>
          {this.renderRangeRows()}
        </TableBody>
      </Table>
    ) 
  }

  renderRangeRows() {
    return this.props.rangeList.map(range => (
      <RangeRow {...this.getRangeRowProps(range)} />
    ))
  }

  getRangeRowProps(range) {
    return {
      editing: this.props.editing,
      key: range.id,
      mode: 'ranges',
      range
    }
  }

}

export default injectSheet(styles)(RangeTable)