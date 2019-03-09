import {analyzeRanges} from 'util/range-analyzer'
import comboGroups from 'lib/combo-groups'
import {createSelector} from 'reselect'
import {handsFromCombos} from 'util/hands-output-builder'
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

// Variable Selectors
const getSelectedComboIdsForRange = (state, name) => 
  fromRangeBuilder.getSelectedComboIdsForRange(getRangeBuilderState(state), name)

const getSelectedCombosForRange = createSelector(
  getSelectedComboIdsForRange, 
  (selectedComboIds) => selectedComboIds.map((id) => comboGroups[id])
)

export const makeGetHandsForRange = () => createSelector(
  getSelectedCombosForRange,
  getBoard,
  (combos, board) => handsFromCombos(combos, board)
)

export const makeGetRangeOutput = () => createSelector(
  getSelectedCombosForRange,
  (selectedCombos) => rangeFromCombos(selectedCombos)
)

export const getRangesAnalysis = createSelector(
  getBoard,
  getRanges,
  (board, ranges) => analyzeRanges(ranges, board)
)

export const getRangeAnalysisForRangeNamed = (state, name) => 
  getRangesAnalysis(state)[name]
