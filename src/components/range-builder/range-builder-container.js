import {bindActionCreators} from 'redux'
import {
  clearSelectedComboIds,
  getComboIds
} from 'modules/range-builder'
import {connect} from 'react-redux'
import RangeBuilder from 'components/range-builder/range-builder-component'

const mapStateToProps = (state) => ({
  comboIds: getComboIds(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    clearSelectedComboIds
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeBuilder)