import {
  forEach,
  reduce
} from 'lodash'
import exportReducer, * as fromExport from 'modules/range-builder/reducers/export'
import exportStorageConfig from 'modules/range-builder/reducers/export/storage-config'
import importReducer, * as fromImport from 'modules/range-builder/reducers/import'
import importStorageConfig from 'modules/range-builder/reducers/import/storage-config'
import {
  findRangeContainingCombo,
  findRangeContainingComboGroup,
} from 'modules/range-builder/reducers/ranges/utilities'
import rangeBuilderReducer, * as fromRangeBuilder from 'modules/range-builder/reducers/ranges'
import rangeBuilderStorageConfig from 'modules/range-builder/reducers/ranges/storage-config'
import {persistReducer} from 'redux-persist'
import {createSelector} from 'reselect'
import {calculateRangeComposition} from 'util/hand-strength-calculator'
import {
  analyzeRanges,
  filterRanges
} from 'util/range-analyzer'
import {rangeFromCombos} from 'util/range-output-builder'

/*---------*
 * REDUCER *
 *---------*/ 

export const ExportReducer = persistReducer(exportStorageConfig, exportReducer)
export const ImportReducer = persistReducer(importStorageConfig, importReducer)
export const RangeBuilderReducer = persistReducer(rangeBuilderStorageConfig, rangeBuilderReducer)

/*---------*
 * ACTIONS *
 *---------*/

export * from 'modules/range-builder/actions'

export const addRange = fromRangeBuilder.addRange
export const clearSelectedCombosFromRange = fromRangeBuilder.clearSelectedCombosFromRange
export const deleteRange = fromRangeBuilder.deleteRange
export const selectRange = fromRangeBuilder.selectRange
export const setBoard = fromRangeBuilder.setBoard
export const setEditing = fromRangeBuilder.setEditing
export const setPlayerHand = fromRangeBuilder.setPlayerHand
export const setRangeName = fromRangeBuilder.setRangeName

/*--------*
 * EXPORT *
 *--------*/
export const getExportState = (state) => state.Export
export const getExportFileName = (state) => fromExport.getExportFileName(getExportState(state))
export const getIsExportDialogOpen = (state) => fromExport.getIsExportDialogOpen(getExportState(state))

/*--------*
 * IMPORT *
 *--------*/
export const getImportState = (state) => state.Import
export const getImportFile = (state) => fromImport.getImportFile(getImportState(state))
export const getIsImportDialogOpen = (state) => fromImport.getIsImportDialogOpen(getImportState(state))
export const getIsImporting = (state) => fromImport.getIsImporting(getImportState(state))

/*--------*
 * RANGES *
 *--------*/

export const getRangeBuilderState = (state) => state.RangeBuilder
export const getBoard = (state) => 
  fromRangeBuilder.getBoard(getRangeBuilderState(state))
export const getBoardCards = (state) =>
  fromRangeBuilder.getBoardCards(getRangeBuilderState(state))
export const getDeadCards = (state) =>
  fromRangeBuilder.getDeadCards(getRangeBuilderState(state))
export const getHand = (state) =>
  fromRangeBuilder.getHand(getRangeBuilderState(state))
export const getHandCards = (state) =>
  fromRangeBuilder.getHandCards(getRangeBuilderState(state))
export const getHighlightedComboGroups = (state) =>
  fromRangeBuilder.getHighlightedComboGroups(getRangeBuilderState(state))
export const getIsAddRangeMenuOpen = (state) =>
  fromRangeBuilder.getIsAddRangeMenuOpen(getRangeBuilderState(state))
export const getIsDeleteAllDialogOpen = (state) =>
  fromRangeBuilder.getIsDeleteAllDialogOpen(getRangeBuilderState(state))
export const getIsEditing = (state) =>
  fromRangeBuilder.getIsEditing(getRangeBuilderState(state))
export const getIsRangeSelected = (state, id) => 
  fromRangeBuilder.getIsRangeSelected(getRangeBuilderState(state), id)
export const getIsSelecting = (state) =>
  fromRangeBuilder.getIsSelecting(getRangeBuilderState(state))
export const getIsSelectingSuits = (state) =>
  fromRangeBuilder.getIsSelectingSuits(getRangeBuilderState(state))
export const getRangeById = (state, id) =>
  fromRangeBuilder.getRangeById(getRangeBuilderState(state), id)
export const getRangeColors = (state) =>
  fromRangeBuilder.getRangeColors(getRangeBuilderState(state))
export const getRangeIdList = (state) =>
  fromRangeBuilder.getRangeIdList(getRangeBuilderState(state))
export const getRanges = (state) =>
  fromRangeBuilder.getRanges(getRangeBuilderState(state))
export const getSelectedRange = (state) =>
  fromRangeBuilder.getSelectedRange(getRangeBuilderState(state))
export const getSelectedRangeColor = (state) => 
  fromRangeBuilder.getSelectedRangeColor(getRangeBuilderState(state))
export const getSelectedRangeId = (state) =>
  fromRangeBuilder.getSelectedRangeId(getRangeBuilderState(state))


/*-----------------*
 * COMBO SELECTORS *
 *-----------------*/

export const getRangeList = createSelector(
  getRangeIdList,
  getRanges,
  (rangeIdList, ranges) => rangeIdList.map((rangeId) => ranges[rangeId])
)

export const makeGetIsComboSelected = (comboId) => createSelector(
  getRangeList,
  (rangeList) => !!findRangeContainingCombo(rangeList, comboId)
)

export const makeGetRangeForCombo = (comboId) => createSelector(
  getRangeList,
  (rangeList) => findRangeContainingCombo(rangeList, comboId)
)

export const makeGetRangeForComboGroup = (comboGroupId) => createSelector(
  getRangeList,
  (rangeList) => findRangeContainingComboGroup(rangeList, comboGroupId)
)

export const getRangeColorForCombo = (comboId) => createSelector(
  getRangeList,
  (rangeList) => {
    const range = findRangeContainingCombo(rangeList, comboId)

    return range ? range.color : ''
  }
)


export const makeGetIsComboGroupSelected = (comboGroupId) => createSelector(
  getRangeList,
  (rangeList) => !!findRangeContainingComboGroup(rangeList, comboGroupId)
)

export const getRangesAnalysis = createSelector(
  getDeadCards,
  getRangeList,
  (deadCards, rangeList) => analyzeRanges(rangeList, deadCards)
)

export const getRangeAnalysisForRange = (state, id) => 
  getRangesAnalysis(state)[id]

export const getSelectedRangeOutput = createSelector(
  getSelectedRange,
  (selectedRange) => {
    let output = ''

    if (selectedRange) {
      output = rangeFromCombos(selectedRange.selectedCombos)
    }

    return output
  }
)

export const makeGetCanEquityBeCalculatedForRange = () => createSelector(
  getRangeById,
  getHandCards,
  (range, handCards) => {
    let equityCalculable = false

    if (handCards.length === 2) {
      forEach(range.selectedCombos, (combos) => {
        equityCalculable = combos.length > 0

        return !equityCalculable
      })
    }

    return equityCalculable
  }
)

export const makeGetRangesComboGroupSelection = (comboGroupId) => createSelector(
  getRangeList,
  getDeadCards,
  (rangeList, deadCards) => {
    const filteredRangeList = filterRanges(rangeList, deadCards)

    return reduce(filteredRangeList, (acc, range) => {
      acc[range.id] = range.selectedCombos[comboGroupId] || []

      return acc
    }, {})
  }
)

export const getSelectedRangeComposition = createSelector(
  getBoard,
  getSelectedRange,
  (board, range) => calculateRangeComposition(board, range)
)
