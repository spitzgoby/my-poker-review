import {connect} from 'react-redux'
import {
  getComboIds,
} from 'modules/range-builder'
import RangeBuilder from 'components/range-builder/range-builder-component'

const mapStateToProps = (state) => ({
  comboIds: getComboIds(state),
})


export default connect(mapStateToProps)(RangeBuilder)