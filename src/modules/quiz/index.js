import quizReducer, * as fromQuiz from './reducers' 

/*---------*
 * ACTIONS *
 *---------*/

export * from './actions'

/*----------*
 * REDUCERS *
 *----------*/
export const QuizReducer = quizReducer

/*-----------*
 * SELECTORS *
 *-----------*/
const getQuizState = (state) => state.Quiz
export const getQuizLength = (state) => fromQuiz.getQuizLength(getQuizState(state))