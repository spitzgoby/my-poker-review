import AppBar from 'components/app-bar/component'
import {
  getIsAppMenuOpen,
  setAppMenuOpen
} from 'modules/application'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  open: getIsAppMenuOpen(state)  
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setAppMenuOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
