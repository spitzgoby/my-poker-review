import {types} from '../../constants'

const initialState = {
    selectRangeDialogOpen: false
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case types.SET_SELECT_RANGE_DIALOG_OPEN:
            newState = {
                ...state,
                selectRangeDialogOpen: !state.selectRangeDialogOpen
            }
            break

        default:
            newState = state
    }

    return newState
}

export const getIsSelectRangeDialogOpen = (state) => state.selectRangeDialogOpen