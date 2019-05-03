import {combineReducers} from 'redux'
import {
  ImportReducer,
  RangeBuilderReducer,
} from 'modules/range-builder'

export default combineReducers({
  Import: ImportReducer, 
  RangeBuilder: RangeBuilderReducer
})
