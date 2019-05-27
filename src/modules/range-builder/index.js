import exportReducer, * as fromExport from 'modules/range-builder/reducers/export'
import importReducer, * as fromImport from 'modules/range-builder/reducers/import'
import rangeBuilderReducer, * as fromRangeBuilder from 'modules/range-builder/range-builder-duck'
import {createSelector} from 'reselect'
import {analyzeRanges} from 'util/range-analyzer'
import {rangeFromCombos} from 'util/range-output-builder'

/*---------*
 * REDUCER *
 *---------*/ 

export const ExportReducer = exportReducer
export const ImportReducer = importReducer
export const RangeBuilderReducer = rangeBuilderReducer

/*---------*
 * ACTIONS *
 *---------*/

export * from 'modules/range-builder/actions'

export const addRange = fromRangeBuilder.addRange
export const clearAllSelectedCombos = fromRangeBuilder.clearAllSelectedCombos
export const clearSelectedCombosFromRange = fromRangeBuilder.clearSelectedCombosFromRange
export const clearSelectedComboGroupIds = fromRangeBuilder.clearSelectedComboGroupIds
export const deleteRange = fromRangeBuilder.deleteRange
export const selectCombos = fromRangeBuilder.selectCombos
export const selectRange = fromRangeBuilder.selectRange
export const setBoard = fromRangeBuilder.setBoard
export const setEditing = fromRangeBuilder.setEditing
export const setPlayerHand = fromRangeBuilder.setPlayerHand
export const setRangeName = fromRangeBuilder.setRangeName

/*--------*
 * EXPORT *
 *--------*/
const getExportState = (state) => state.Export
export const getExportFileName = (state) => fromExport.getExportFileName(getExportState(state))
export const getIsExportDialogOpen = (state) => fromExport.getIsExportDialogOpen(getExportState(state))

/*--------*
 * IMPORT *
 *--------*/
const getImportState = (state) => state.Import
export const getImportFile = (state) => fromImport.getImportFile(getImportState(state))
export const getIsImportDialogOpen = (state) => fromImport.getIsImportDialogOpen(getImportState(state))
export const getIsImporting = (state) => fromImport.getIsImporting(getImportState(state))

/*--------*
 * RANGES *
 *--------*/

const getRangeBuilderState = (state) => state.RangeBuilder
export const getBoard = (state) => 
  fromRangeBuilder.getBoard(getRangeBuilderState(state))
export const getBoardCards = (state) =>
  fromRangeBuilder.getBoardCards(getRangeBuilderState(state))
export const getCardsForStreet = (state, street) =>
  fromRangeBuilder.getCardsForStreet(getRangeBuilderState(state), street)
export const getIsAddRangeMenuOpen = (state) =>
  fromRangeBuilder.getIsAddRangeMenuOpen(getRangeBuilderState(state))
export const getIsEditing = (state) =>
  fromRangeBuilder.getIsEditing(getRangeBuilderState(state))
export const getIsComboSelected = (state, id) =>
  fromRangeBuilder.getIsComboSelected(getRangeBuilderState(state), id)
export const getIsRangeSelected = (state, id) => 
  fromRangeBuilder.getIsRangeSelected(getRangeBuilderState(state), id)
export const getIsSelecting = (state) =>
  fromRangeBuilder.getIsSelecting(getRangeBuilderState(state))
export const getPlayerHand = (state) => 
  fromRangeBuilder.getPlayerHand(getRangeBuilderState(state))
export const getRanges = (state) => 
  fromRangeBuilder.getRanges(getRangeBuilderState(state))
export const getRangeById = (state, id) =>
  fromRangeBuilder.getRangeById(getRangeBuilderState(state), id)
export const getRangeColors = (state) =>
  fromRangeBuilder.getRangeColors(getRangeBuilderState(state))
export const getRangeColorForCombo = (state, comboId) =>
  fromRangeBuilder.getRangeColorForCombo(getRangeBuilderState(state), comboId)
export const getRangeForCombo = (state, comboId) =>
  fromRangeBuilder.getRangeForComboGroup(getRangeBuilderState(state))
export const getRangeForComboGroup = (state, comboGroupId) =>
  fromRangeBuilder.getRangeForComboGroup(getRangeBuilderState(state), comboGroupId)
export const getSelectedRangeColor = (state) => 
  fromRangeBuilder.getSelectedRangeColor(getRangeBuilderState(state))

/*-----------------*
 * COMBO SELECTORS *
 *-----------------*/

export const makeGetIsComboGroupSelected = () => createSelector(
  getRangeForComboGroup,
  (range) => !!range
)

export const makeGetRangeColorForComboGroup = () => createSelector(
  getRangeForComboGroup,
  (range) => range 
    ? range.color 
    : ''
)

export const getRangesAnalysis = createSelector(
  getBoardCards,
  getRanges,
  (boardCards, ranges) => analyzeRanges(ranges, boardCards)
)

export const getRangeAnalysisForRange = (state, id) => 
  getRangesAnalysis(state)[id]


export const makeGetOutputForRange = () => createSelector(
  getRangeById,
  (range) => rangeFromCombos(range.selectedCombos)
)
