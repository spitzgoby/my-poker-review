import {types} from '../constants'

export const setRanges = (ranges) => ({
    type: types.SET_RANGES,
    payload: { ranges }
})