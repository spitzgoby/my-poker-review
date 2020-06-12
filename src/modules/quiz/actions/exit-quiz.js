import {types} from '../constants'
import {modes} from 'lib/application-constants'
import {setMode} from 'modules/application'

export const exitQuiz = () => (dispatch) => {
    dispatch(setMode(modes.RANGES))

    dispatch({
        type: types.EXIT_QUIZ
    })
}