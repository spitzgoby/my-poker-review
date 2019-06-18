import Menu from 'components/app-bar/menu/component'
import {
  getMode,
  setMode
} from 'modules/application'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  mode: getMode(state)  
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setMode
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
