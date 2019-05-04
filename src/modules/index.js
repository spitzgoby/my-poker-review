import {combineReducers} from 'redux'
import {
  ExportReducer,
  ImportReducer,
  RangeBuilderReducer,
} from 'modules/range-builder'

export default combineReducers({
  Export: ExportReducer,
  Import: ImportReducer, 
  RangeBuilder: RangeBuilderReducer
})
