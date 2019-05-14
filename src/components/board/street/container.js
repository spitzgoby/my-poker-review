import Street from 'components/board/street/component'
import {getCardsForStreet} from 'modules/range-builder'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


const mapStateToProps = (state, ownProps) => ({
  cards: getCardsForStreet(state, ownProps.street)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({

  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Street)


