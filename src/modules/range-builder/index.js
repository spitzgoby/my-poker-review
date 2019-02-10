import reducer, * as fromRangeBuilder from 'modules/range-builder/range-builder-duck'

// Reducer
export default reducer

// Actions
export const selectCombo = fromRangeBuilder.selectCombo

// Selectors
const getRangeBuilderState = (state) => state.rangeBuilder
export const getCombo = (state, id) => fromRangeBuilder.getCombo(getRangeBuilderState(state), id)
export const getComboIds = (state) => fromRangeBuilder.getComboIds(getRangeBuilderState(state))
export const getIsComboSelected = (state, id) => fromRangeBuilder.getIsComboSelected(getRangeBuilderState(state), id)