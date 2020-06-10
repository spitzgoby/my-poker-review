import {types} from '../constants'

const DEFAULT_QUIZ_LENGTH = 100

const initialState = {
    currentQuestion: 0,
    questions: [],
    quizLength: DEFAULT_QUIZ_LENGTH,
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

export const getCurrentQuestion = (state) => state.currentQuestion
export const getQuizLength = (state) => state.quizLength
export const getTotalAnswered = (state) => state.totalAnswered
export const getTotalCorrect = (state) => state.totalCorrect
export const getTotalMissed = (state) => state.totalMissed