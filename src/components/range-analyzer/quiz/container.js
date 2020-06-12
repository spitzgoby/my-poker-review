import Quiz from './component'
import {
    answerQuestion,
    exitQuiz,
    finishQuiz,
    getCurrentQuestion,
    getCurrentQuestionIndex,
    getMissedQuestions,
    getQuizFinished,
    getQuizLength,
    getTotalCorrect,
    getTotalMissed,
    startQuiz
} from 'modules/quiz'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = (state) => ({
    currentQuestion: getCurrentQuestion(state),
    currentQuestionIndex: getCurrentQuestionIndex(state),
    missedQuestions: getMissedQuestions(state),
    quizFinished: getQuizFinished(state),
    quizLength: getQuizLength(state),
    totalCorrect: getTotalCorrect(state),
    totalMissed: getTotalMissed(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        answerQuestion,
        exitQuiz,
        finishQuiz,
        startQuiz
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)