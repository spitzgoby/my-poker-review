import {createSelector} from 'reselect'
import {rangeFromCombos} from 'util/range-output-builder'
import reducer, * as fromRangeBuilder from 'modules/range-builder/range-builder-duck'

// Reducer
export default reducer

// Actions
export const calculateEquities = fromRangeBuilder.calculateEquities
export const clearSelectedComboIds = fromRangeBuilder.clearSelectedComboIds
export const selectCombo = fromRangeBuilder.selectCombo
export const selectRange = fromRangeBuilder.selectRange
export const setBoard = fromRangeBuilder.setBoard
export const setPlayerHand = fromRangeBuilder.setPlayerHand

// Selectors
const getRangeBuilderState = (state) => state.rangeBuilder
export const getBoard = (state) => 
  fromRangeBuilder.getBoard(getRangeBuilderState(state))
export const getCombo = (state, id) => 
  fromRangeBuilder.getCombo(getRangeBuilderState(state), id)
export const getComboIds = (state) => 
  fromRangeBuilder.getComboIds(getRangeBuilderState(state))
export const getEquities = (state) => 
  fromRangeBuilder.getEquities(getRangeBuilderState(state))
export const getIsComboSelected = (state, id) => 
  fromRangeBuilder.getIsComboSelected(getRangeBuilderState(state), id)
export const getIsRangeSelected = (state, name) => 
  fromRangeBuilder.getIsRangeSelected(getRangeBuilderState(state), name)
export const getPlayerHand = (state) => 
  fromRangeBuilder.getPlayerHand(getRangeBuilderState(state))
export const getRanges = (state) => 
  fromRangeBuilder.getRanges(getRangeBuilderState(state))
export const getSelectedRangeColor = (state) => 
  fromRangeBuilder.getSelectedRangeColor(getRangeBuilderState(state))

// Make Selectors
const getCombos = (state) => fromRangeBuilder.getCombos(getRangeBuilderState(state))
const getSelectedComboIdsForRange = (state, name) => 
  fromRangeBuilder.getSelectedComboIdsForRange(getRangeBuilderState(state), name)

export const makeGetRangeOutput = () => createSelector(
  getCombos,
  getSelectedComboIdsForRange,
  (combos, selectedComboIds) => {
    const selectedCombos = selectedComboIds.map(id => combos[id])

    return rangeFromCombos(selectedCombos)
  }
)
