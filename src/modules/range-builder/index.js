import {analyzeRanges} from 'util/range-analyzer'
import {createSelector} from 'reselect'
import {getCardsFromInput} from 'util/card-input-parser'
import reducer, * as fromRangeBuilder from 'modules/range-builder/range-builder-duck'

// Reducer
export default reducer

// Actions
export const addRange = fromRangeBuilder.addRange
export const clearAllSelectedCombos = fromRangeBuilder.clearAllSelectedCombos
export const clearSelectedCombosFromRange = fromRangeBuilder.clearSelectedCombosFromRange
export const clearSelectedComboGroupIds = fromRangeBuilder.clearSelectedComboGroupIds
export const selectCombos = fromRangeBuilder.selectCombos
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
export const getRangeForComboGroup = (state, comboGroupId) =>
  fromRangeBuilder.getRangeForComboGroup(getRangeBuilderState(state), comboGroupId)
export const getSelectedRangeColor = (state) => 
  fromRangeBuilder.getSelectedRangeColor(getRangeBuilderState(state))

// Variable Selectors
export const makeGetRangeColorForComboGroup = () => createSelector(
  getRangeForComboGroup,
  (range) => range 
    ? range.color 
    : ''
)

export const getRangesAnalysis = createSelector(
  getBoard,
  getRanges,
  (board, ranges) => analyzeRanges(ranges, getCardsFromInput(board))
)

export const getRangeAnalysisForRange = (state, id) => 
  getRangesAnalysis(state)[id]
