import {analyzeRanges} from 'util/range-analyzer'
import {createSelector} from 'reselect'
import {parseCardInput} from 'util/card-input-parser'
import reducer, * as rangeBuilder from 'modules/range-builder/range-builder-duck'

/*---------*
 * REDUCER *
 *---------*/ 

export default reducer

/*---------*
 * ACTIONS *
 *---------*/

export const addRange = rangeBuilder.addRange
export const clearAllSelectedCombos = rangeBuilder.clearAllSelectedCombos
export const clearSelectedCombosFromRange = rangeBuilder.clearSelectedCombosFromRange
export const clearSelectedComboGroupIds = rangeBuilder.clearSelectedComboGroupIds
export const selectCombos = rangeBuilder.selectCombos
export const selectRange = rangeBuilder.selectRange
export const setBoard = rangeBuilder.setBoard
export const setPlayerHand = rangeBuilder.setPlayerHand
export const setRangeName = rangeBuilder.setRangeName

/*-----------------*
 * BASIC SELECTORS *
 *-----------------*/

const getRangeBuilderState = (state) => state.rangeBuilder
export const getBoard = (state) => 
  rangeBuilder.getBoard(getRangeBuilderState(state))
export const getEquities = (state) => 
  rangeBuilder.getEquities(getRangeBuilderState(state))
export const getIsComboGroupSelected = (state, id) => 
  rangeBuilder.getIsComboGroupSelected(getRangeBuilderState(state), id)
export const getIsRangeSelected = (state, id) => 
  rangeBuilder.getIsRangeSelected(getRangeBuilderState(state), id)
export const getPlayerHand = (state) => 
  rangeBuilder.getPlayerHand(getRangeBuilderState(state))
export const getRanges = (state) => 
  rangeBuilder.getRanges(getRangeBuilderState(state))
export const getRangeForComboGroup = (state, comboGroupId) =>
  rangeBuilder.getRangeForComboGroup(getRangeBuilderState(state), comboGroupId)
export const getSelectedRangeColor = (state) => 
  rangeBuilder.getSelectedRangeColor(getRangeBuilderState(state))

/*-----------------*
 * COMBO SELECTORS *
 *-----------------*/

export const makeGetRangeColorForComboGroup = () => createSelector(
  getRangeForComboGroup,
  (range) => range 
    ? range.color 
    : ''
)

export const getRangesAnalysis = createSelector(
  getBoard,
  getRanges,
  (board, ranges) => analyzeRanges(ranges, parseCardInput(board))
)

export const getRangeAnalysisForRange = (state, id) => 
  getRangesAnalysis(state)[id]
