import {types} from 'modules/range-builder/constants'

export const setCompositionFilter = (name, value) => ({
  type: types.SET_COMPOSITION_FILTER,
  payload: {
    name,
    value
  }
})