import {bindActionCreators} from 'redux'
import {
  clearSelectedComboGroupIds,
  getSelectedRangeColor
} from 'modules/range-builder'
import {connect} from 'react-redux'
import RangeBuilder from 'components/range-builder/range-builder-component'

const mapStateToProps = (state) => ({
  selectedColor: getSelectedRangeColor(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    clearSelectedComboGroupIds
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RangeBuilder)