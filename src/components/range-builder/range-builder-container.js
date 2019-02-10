import {connect} from 'react-redux'
import {
  getComboIds,
  getRangeOutput
} from 'modules/range-builder'
import RangeBuilder from 'components/range-builder/range-builder-component'

const mapStateToProps = (state) => ({
  comboIds: getComboIds(state),
  rangeOutput: getRangeOutput(state)
})

export default connect(mapStateToProps)(RangeBuilder)