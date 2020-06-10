import {modes} from 'lib/application-constants'
import {generateQuestion} from 'lib/question'
import {flatMap, shuffle} from 'lodash'
import {getRangeList} from 'modules/range-builder'
import {setMode} from 'modules/application'
import {types} from '../constants'
import { getQuizLength } from 'modules/quiz'

export const startQuiz = () => (dispatch, getState) => {
    const state = getState()
    const quizLength = getQuizLength(state)
    const rangeList = getRangeList(state)
    const allQuestions = rangeList.reduce((acc, range) =>
        acc.concat(flatMap(range.selectedCombos, combos => 
            combos.map(combo => generateQuestion(combo, rangeList, range)))
        ), [])
    const questions = shuffle(allQuestions).slice(0, quizLength - 1)

    dispatch(setMode(modes.QUIZ))

    dispatch({
        type: types.START_QUIZ,
        payload: { questions }
    })
}