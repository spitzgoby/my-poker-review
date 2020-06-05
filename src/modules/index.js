import {combineReducers} from 'redux'
import {ApplicationReducer} from 'modules/application'
import {
  EquityReducer
} from 'modules/equity'
import {
  CompositionReducer,
  DefaultRangesReducer,
  ExportReducer,
  ImportReducer,
  RangeBuilderReducer,
} from 'modules/range-builder'

export default combineReducers({
  Application: ApplicationReducer,
  DefaultRanges: DefaultRangesReducer,
  Composition: CompositionReducer,
  Equity: EquityReducer,
  Export: ExportReducer,
  Import: ImportReducer, 
  RangeBuilder: RangeBuilderReducer
})
