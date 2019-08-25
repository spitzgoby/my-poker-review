import AddRange from 'components/app-bar/menu/actions/add-range/component'
import {addRange} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    addRange
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(AddRange)
