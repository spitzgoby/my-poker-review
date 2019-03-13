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
export const clearSelectedComboGroupIds = fromRangeBuilder.clearSelectedComboGroupIds
export const selectComboGroup = fromRangeBuilder.selectComboGroup
export const selectRange = fromRangeBuilder.selectRange
export const setBoard = fromRangeBuilder.setBoard
export const setPlayerHand = fromRangeBuilder.setPlayerHand
export const setRangeName = fromRangeBuilder.setRangeName

// Selectors
const getRangeBuilderState = (state) => state.rangeBuilder
export const getBoard = (state) => 
  fromRangeBuilder.getBoard(getRangeBuilderState(state))
export const getEquities = (state) => 
  fromRangeBuilder.getEquities(getRangeBuilderState(state))
export const getIsComboGroupSelected = (state, id) => 
  fromRangeBuilder.getIsComboGroupSelected(getRangeBuilderState(state), id)
export const getIsRangeSelected = (state, id) => 
  fromRangeBuilder.getIsRangeSelected(getRangeBuilderState(state), id)
export const getPlayerHand = (state) => 
  fromRangeBuilder.getPlayerHand(getRangeBuilderState(state))
export const getRanges = (state) => 
  fromRangeBuilder.getRanges(getRangeBuilderState(state))
export const getSelectedRangeColor = (state) => 
  fromRangeBuilder.getSelectedRangeColor(getRangeBuilderState(state))

// Variable Selectors
const getSelectedComboGroupIdsForRange = (state, id) => 
  fromRangeBuilder.getSelectedComboGroupIdsForRange(getRangeBuilderState(state), id)

const getSelectedComboGroupsForRange = createSelector(
  getSelectedComboGroupIdsForRange, 
  (selectedComboGroupIds) => selectedComboGroupIds.map((id) => comboGroups[id])
)

export const makeGetHandsForRange = () => createSelector(
  getSelectedComboGroupsForRange,
  getBoard,
  (comboGroups, board) => handsFromCombos(comboGroups, board)
)

export const makeGetRangeOutput = () => createSelector(
  getSelectedComboGroupsForRange,
  (selectedComboGroups) => rangeFromCombos(selectedComboGroups)
)

export const getRangesAnalysis = createSelector(
  getBoard,
  getRanges,
  (board, ranges) => analyzeRanges(ranges, board)
)

export const getRangeAnalysisForRange = (state, id) => 
  getRangesAnalysis(state)[id]
