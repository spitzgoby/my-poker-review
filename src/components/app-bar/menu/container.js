import Menu from 'components/app-bar/menu/component'
import {
  getInputMode,
  getMode,
  setInputMode,
  setMode
} from 'modules/application'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  inputMode: getInputMode(state),
  mode: getMode(state)  
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setInputMode,
    setMode
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
