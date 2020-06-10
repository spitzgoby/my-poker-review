import Quiz from './component'
import {getCurrentQuestion} from 'modules/quiz'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    currentQuestion: getCurrentQuestion(state)
})

export default connect(mapStateToProps)(Quiz)