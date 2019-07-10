import App from 'components/app'
import {ConnectedRouter} from 'connected-react-router'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import store, { 
  history,
  persistor
} from './store'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <PersistGate loading={<span>loading</span>} persistor={persistor}>
          <App />
        </PersistGate>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
