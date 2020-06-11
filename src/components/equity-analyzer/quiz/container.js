import Quiz from './component'
import {
    answerQuestion,
    getCurrentQuestion,
    getCurrentQuestionIndex,
    getQuizFinished,
    getQuizLength,
    getTotalCorrect,
    getTotalMissed
} from 'modules/quiz'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
    currentQuestion: getCurrentQuestion(state),
    currentQuestionIndex: getCurrentQuestionIndex(state),
    quizFinished: getQuizFinished(state),
    quizLength: getQuizLength(state),
    totalCorrect: getTotalCorrect(state),
    totalMissed: getTotalMissed(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        answerQuestion
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)