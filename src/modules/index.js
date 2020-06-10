import {combineReducers} from 'redux'
import {ApplicationReducer} from './application'
import {
  EquityReducer
} from './equity'
import {
  CompositionReducer,
  DefaultRangesReducer,
  ExportReducer,
  ImportReducer,
  RangeBuilderReducer,
} from './range-builder'
import { QuizReducer } from './quiz'

export default combineReducers({
  Application: ApplicationReducer,
  DefaultRanges: DefaultRangesReducer,
  Composition: CompositionReducer,
  Equity: EquityReducer,
  Export: ExportReducer,
  Import: ImportReducer, 
  Quiz: QuizReducer,
  RangeBuilder: RangeBuilderReducer
})
