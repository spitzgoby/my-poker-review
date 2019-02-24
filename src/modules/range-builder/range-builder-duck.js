import {actionCreator} from 'redux-action-creator'
import {buildCombos} from 'util/combo-builder'
import {createSelector} from 'reselect'
import {handsFromCombos} from 'util/hands-output-builder'
import {rangeFromCombos} from 'util/range-output-builder'

/*-------------*
 *** ACTIONS ***
 *-------------*/
const types = {
  CLEAR_SELECTED_COMBO_IDS: '@my-poker-review/range-builder/CLEAR_SELECTED_COMBO_IDS',
  SELECT_COMBO: '@my-poker-review/range-builder/SELECT_COMBO'
}

export const clearSelectedComboIds = actionCreator(types.CLEAR_SELECTED_COMBO_IDS)
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
  selectedComboIds: []
}

export default function(state = initialState, action = {}) {
  let nextState;

  switch(action.type) {
    case types.SELECT_COMBO:
      nextState = {
        ...state,
        selectedComboIds: state.selectedComboIds.includes(action.payload.id)
          ? state.selectedComboIds.filter(id => id !== action.payload.id)
          : state.selectedComboIds.concat([action.payload.id])
      }
      break

    case types.CLEAR_SELECTED_COMBO_IDS:
      nextState = {
        ...state,
        selectedComboIds: []
      }
      break

    default:
      nextState = state
  }

  return nextState;
}

/*---------------------*
 *** BASIC SELECTORS ***
 *---------------------*/
export const getCombo = (state, id) => state.entities[id]
export const getCombos = (state) => state.entities
export const getComboIds = (state) => state.comboIds
export const getIsComboSelected = (state, id) => state.selectedComboIds.includes(id)
export const getSelectedComboIds = (state) => state.selectedComboIds

/*------------------------*
 *** COMBINED SELECTORS ***
 *------------------------*/
export const getSelectedCombos = createSelector(
  getCombos,
  getSelectedComboIds,
  (combos, selectedComboIds) => selectedComboIds.map(id => combos[id])
)
export const getHands = (state) => handsFromCombos(getSelectedCombos(state))
export const getRangeOutput = (state) => rangeFromCombos(getSelectedCombos(state))
