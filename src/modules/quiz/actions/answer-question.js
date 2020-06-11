import {types} from '../constants'

export const answerQuestion = answer => ({
    type: types.ANSWER_QUESTION,
    payload: { answer }
})