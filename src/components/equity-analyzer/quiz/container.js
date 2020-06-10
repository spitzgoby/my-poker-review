import Quiz from './component'
import {
    getCurrentQuestion,
    getCurrentQuestionIndex,
    getQuizLength
} from 'modules/quiz'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    currentQuestion: getCurrentQuestion(state),
    currentQuestionIndex: getCurrentQuestionIndex(state),
    quizLength: getQuizLength(state)
})

export default connect(mapStateToProps)(Quiz)