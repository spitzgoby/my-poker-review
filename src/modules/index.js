import {combineReducers} from 'redux'
import {ApplicationReducer} from 'modules/application'
import {
  ExportReducer,
  ImportReducer,
  RangeBuilderReducer,
} from 'modules/range-builder'

export default combineReducers({
  Application: ApplicationReducer,
  Export: ExportReducer,
  Import: ImportReducer, 
  RangeBuilder: RangeBuilderReducer
})
