import RangeAnalyzerHeader from 'components/range-analyzer/header'
import RangeAnalyzerToolbar from 'components/range-analyzer/toolbar'
import RangeAnalyzerRow from 'components/range-analyzer/row'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

class RangeAnalyzer extends Component {

  constructor(props) {
    super(props)

    this.handleClearAllButtonClick = this.handleClearAllButtonClick.bind(this)

    this.state = {
      anchorEl: null
    }
  }

  static propTypes = {
    actions: PropTypes.shape({
      onAddRange: PropTypes.func,
      onClearCombos: PropTypes.func,
      onEdit: PropTypes.func
    }).isRequired,
    className: PropTypes.string,
    ranges: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string
    }))
  }

  static defaultProps = {
    ranges: []
  }

  render() {
    return (
      <Paper> 
        <RangeAnalyzerToolbar />
        <Table>
          <RangeAnalyzerHeader />
          <TableBody>
            {this.renderRangeRows()}
          </TableBody>
        </Table>
      </Paper>
    ) 
  }

  renderRangeRows() {
    return this.props.ranges.map(range => (
      <RangeAnalyzerRow {...this.getRangeRowProps(range)} />
    ))
  }

  getRangeRowProps(range) {
    return {
      editing: this.props.editing,
      key: range.id,
      range
    }
  }

  handleClearAllButtonClick() {
    const onClearAll = this.props.actions.onClearAll

    if (onClearAll) {
      onClearAll()
    }   
  }
}

export default RangeAnalyzer