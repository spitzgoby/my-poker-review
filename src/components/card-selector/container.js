import CardSelector from 'components/card-selector/component'
import {getBoardCards} from 'modules/range-builder'
import {connect} from 'react-redux'


const mapStateToProps = (state) => ({
  deadCards: getBoardCards(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CardSelector)
