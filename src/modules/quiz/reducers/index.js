import {types} from '../constants'

const DEFAULT_QUIZ_LENGTH = 100

const initialState = {
    currentQuestionIndex: 0,
    questions: [],
    quizLength: DEFAULT_QUIZ_LENGTH,
    useOutsideCombos: true,
    totalAnswered: 0,
    totalCorrect:  0,
    totalMissed: 0
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
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
export const getQuizLength = (state) => state.quizLength
export const getShouldUseOutsideCombos = (state) => state.useOutsideCombos
export const getTotalAnswered = (state) => state.totalAnswered
export const getTotalCorrect = (state) => state.totalCorrect
export const getTotalMissed = (state) => state.totalMissed