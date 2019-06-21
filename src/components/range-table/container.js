import {
  getIsEditing,
  getRangeList,
} from 'modules/range-builder'
import {connect} from 'react-redux'
import RangeAnalyzer from 'components/range-table/component'

const mapStateToProps = (state) => ({
  editing: getIsEditing(state),
  rangeList: getRangeList(state)
})

export default connect(mapStateToProps)(RangeAnalyzer)