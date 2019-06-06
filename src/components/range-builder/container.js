import {
  getIsSelectingSuits,
  getSelectedRangeColor,
  setSelectingSuits
} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import RangeBuilder from 'components/range-builder/component'

const mapStateToProps = (state) => ({
  selectedColor: getSelectedRangeColor(state),
  selectingSuits: getIsSelectingSuits(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onSelectSuits: setSelectingSuits
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeBuilder)