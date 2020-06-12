import {types} from '../constants'

const DEFAULT_QUIZ_LENGTH = 100

const initialState = {
    currentQuestionIndex: 0,
    missedQuestions: [],
    questions: [],
    quizFinished: false,
    quizLength: DEFAULT_QUIZ_LENGTH,
    useOutsideCombos: true,
    totalAnswered: 0,
    totalCorrect:  0,
    totalMissed: 0
}

const getUpdatedQuizTotalsFromAnswer = (state, action) => {
    const answer = action.payload.answer
    const answeredCorrectly = answer.correct
    const {
        currentQuestionIndex,
        missedQuestions,
        questions,
        quizLength,
        totalAnswered,
        totalCorrect,
        totalMissed
    } = state

    const updatedMissedQuestions = answeredCorrectly
        ? missedQuestions
        : missedQuestions.concat([{
            answer,
            question: questions[currentQuestionIndex]
        }])

    return {
        currentQuestionIndex: currentQuestionIndex + 1,
        missedQuestions: updatedMissedQuestions,
        quizFinished: totalAnswered + 1 === quizLength,
        totalAnswered: totalAnswered + 1,
        totalCorrect: answeredCorrectly ? totalCorrect + 1 : totalCorrect,
        totalMissed: answeredCorrectly ? totalMissed : totalMissed + 1,
    }
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case types.ANSWER_QUESTION:
            newState = {
                ...state,
                ...getUpdatedQuizTotalsFromAnswer(state, action)
            }
            break

        case types.FINISH_QUIZ:
            newState = {
                ...state,
                quizFinished: true
            }
            break

        case types.START_QUIZ:
            newState = {
                ...initialState,
                quizLength: action.payload.questions.length,
                questions: action.payload.questions
            }
            break

        default:
            newState = state
            break
    }

    return newState
}

export const getCurrentQuestion = (state) => state.questions[state.currentQuestionIndex]
export const getCurrentQuestionIndex = (state) => state.currentQuestionIndex
export const getMissedQuestions = (state) => state.missedQuestions
export const getQuizFinished = (state) => state.quizFinished
export const getQuizLength = (state) => state.quizLength
export const getShouldUseOutsideCombos = (state) => state.useOutsideCombos
export const getTotalAnswered = (state) => state.totalAnswered
export const getTotalCorrect = (state) => state.totalCorrect
export const getTotalMissed = (state) => state.totalMissed