import {connectRouter, routerMiddleware} from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]
const persistConfig = {
  key: 'my-poker-review',
  storage: storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export const store = createStore(
  connectRouter(history)(persistedReducer),
  initialState,
  composedEnhancers
)
export const persistor = persistStore(store)

export default store
