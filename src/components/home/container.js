import {connect} from 'react-redux'
import Home from 'components/home/component'
import {getMode} from 'modules/application'

const mapStateToProps = (state) => ({
  mode: getMode(state)
})

export default connect(mapStateToProps)(Home)