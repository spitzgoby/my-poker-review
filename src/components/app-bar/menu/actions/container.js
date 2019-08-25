import Actions from 'components/app-bar/menu/actions/component'
import {addRange} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    addRange
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
