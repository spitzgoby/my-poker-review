import Actions from 'components/app-bar/menu/actions/component'
import {
  addRange,
  getIsEditing,
  setEditing
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
  editing: getIsEditing(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    addRange,
    setEditing
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
