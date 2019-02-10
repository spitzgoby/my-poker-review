import {actionCreator} from 'redux-action-creator'
import {buildCombos} from 'modules/range-builder/combo-builder'

/*-------------*
 *** ACTIONS ***
 *-------------*/
const types = {
  SELECT_COMBO: '@my-poker-review/range-builder/SELECT_COMBO'
}

export const selectCombo = actionCreator(types.SELECT_COMBO, 'id')

/*-------------*
 *** REDUCER ***
 *-------------*/
let {
  comboIds,
  entities
} = buildCombos()

const initialState = {
  comboIds,
  entities,
  selected: []
}

export default function(state = initialState, action = {}) {
  let nextState;

  switch(action.type) {
    case types.SELECT_COMBO:
      nextState = {
        ...state,
        selected: state.selected.includes(action.payload.id)
          ? state.selected.filter(id => id !== action.payload.id)
          : state.selected.concat([action.payload.id])
      }

      break

    default:
      nextState = state
  }

  return nextState;
}

/*---------------*
 *** SELECTORS ***
 *---------------*/
export const getCombo = (state, id) => state.entities[id]

export const getComboIds = (state) => state.comboIds

export const getIsComboSelected = (state, id) => state.selected.includes(id)
