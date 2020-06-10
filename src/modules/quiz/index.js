import {persistReducer} from 'redux-persist'
import quizReducer, * as fromQuiz from './reducers' 
import quizStorageConfig from './reducers/storage-config'

/*---------*
 * ACTIONS *
 *---------*/

export * from './actions'

/*----------*
 * REDUCERS *
 *----------*/
export const QuizReducer = persistReducer(quizStorageConfig, quizReducer)

/*-----------*
 * SELECTORS *
 *-----------*/
const getQuizState = (state) => state.Quiz
export const getCurrentQuestion = (state) => fromQuiz.getCurrentQuestion(getQuizState(state))
export const getQuizLength = (state) => fromQuiz.getQuizLength(getQuizState(state))
export const getShouldUseOutsideCombos = (state) => fromQuiz.getShouldUseOutsideCombos(getQuizState(state))