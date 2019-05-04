import AddRangeMenu from 'components/range-analyzer/toolbar/add-range-menu/component'
import {
  addRange,
  getIsAddRangeMenuOpen,
  setAddRangeMenuOpen
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state) => ({
  open: getIsAddRangeMenuOpen(state)  
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onAddRange: addRange,
    onClose: setAddRangeMenuOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRangeMenu)
