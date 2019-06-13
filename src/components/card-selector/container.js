import CardSelector from 'components/card-selector/component'
import {getDeadCards} from 'modules/range-builder'
import {connect} from 'react-redux'


const mapStateToProps = (state) => ({
  deadCards: getDeadCards(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CardSelector)
