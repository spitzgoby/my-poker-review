import {
  getSelectedRangeColor,
} from 'modules/range-builder'
import {connect} from 'react-redux'
import RangeBuilder from 'components/range-builder/component'

const mapStateToProps = (state) => ({
  selectedColor: getSelectedRangeColor(state)
})

export default connect(mapStateToProps)(RangeBuilder)