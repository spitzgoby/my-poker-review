import {comboGroups} from 'lib/combo-groups'
import {modes} from 'lib/application-constants'
import {generateQuestion} from 'lib/question'
import {
    flatMap, 
    sample,
    sampleSize,
    shuffle
} from 'lodash'
import {getRangeList} from 'modules/range-builder'
import {findRangeContainingCombo} from 'modules/range-builder/reducers/ranges/utilities'
import {setMode} from 'modules/application'
import {types} from '../constants'
import { 
    getShouldUseOutsideCombos,
    getQuizLength
} from 'modules/quiz'

export const startQuiz = () => (dispatch, getState) => {
    const state = getState()
    const rangeList = getRangeList(state)
    const quizLength = getQuizLength(state)
    const useOutsideCombos = getShouldUseOutsideCombos(state)
    const questions = generateQuestions(rangeList, quizLength, useOutsideCombos)

    dispatch(setMode(modes.QUIZ))

    dispatch({
        type: types.START_QUIZ,
        payload: { questions }
    })
}

const generateQuestions = (rangeList, quizLength, useOutsideCombos) => {
    return useOutsideCombos
        ? generateQuestionsFromAllCombos(rangeList, quizLength)
        : generateQuestionsFromRanges(rangeList, quizLength)
}

const generateQuestionsFromAllCombos = (rangeList, quizLength) => {
    const quizComboGroups = sampleSize(comboGroups, quizLength)

    return quizComboGroups.map(quizComboGroup => {
        const quizCombo = sample(quizComboGroup.combos)
        const correctRange = findRangeContainingCombo(rangeList, quizCombo.id)

        return generateQuestion(quizCombo.id, rangeList, correctRange)
    })
}

const generateQuestionsFromRanges = (rangeList, quizLength) => {
    const allQuestions = rangeList.reduce((acc, range) =>
        acc.concat(flatMap(range.selectedCombos, combos => 
            combos.map(combo => generateQuestion(combo, rangeList, range)))
        ), [])
    return shuffle(allQuestions).slice(0, quizLength - 1)
}