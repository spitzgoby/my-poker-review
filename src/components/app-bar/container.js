import AppBar from 'components/app-bar/component'
import {
  getIsAppMenuOpen,
  getMode,
  setAppMenuOpen
} from 'modules/application'
import {
  getIsEditing,
  setEditing
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  editing: getIsEditing(state),
  mode: getMode(state),
  open: getIsAppMenuOpen(state)  
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setAppMenuOpen,
    setEditing
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
