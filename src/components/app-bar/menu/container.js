import Menu from 'components/app-bar/menu/component'
import {
  getInputMode,
  getIsAppMenuOpen,
  getMode,
  setAppMenuOpen,
  setInputMode,
  setMode
} from 'modules/application'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  inputMode: getInputMode(state),
  mode: getMode(state),
  open: getIsAppMenuOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setAppMenuOpen,
    setInputMode,
    setMode
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
