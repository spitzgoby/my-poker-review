import {bindActionCreators} from 'redux'
import {clearSelectedComboIds} from 'modules/range-builder'
import {connect} from 'react-redux'
import RangeBuilder from 'components/range-builder/range-builder-component'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    clearSelectedComboIds
  }, dispatch)
})

export default connect(undefined, mapDispatchToProps)(RangeBuilder)