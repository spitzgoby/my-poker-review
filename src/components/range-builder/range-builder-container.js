import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  clearSelectedComboIds,
  getComboIds,
  getRangeOutput
} from 'modules/range-builder'
import RangeBuilder from 'components/range-builder/range-builder-component'

const mapStateToProps = (state) => ({
  comboIds: getComboIds(state),
  rangeOutput: getRangeOutput(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    clearSelectedComboIds
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeBuilder)