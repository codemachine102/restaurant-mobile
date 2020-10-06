import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { enableBatching } from 'redux-batched-actions'
import createSagaMiddleware from 'redux-saga'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import concat from 'lodash/concat'

import createClient from 'apollo'

import DebugConfig from 'config/debug'
import ReduxPersistConfig from 'config/reduxPersist'

import rootSaga from './sagas'
import rootReducer from './slices'

export default function createStore() {
  const persistedReducer = persistReducer(ReduxPersistConfig.rootConfig, rootReducer)
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  const store = configureStore({
    reducer: enableBatching(persistedReducer),

    middleware: concat(
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      middleware,
    ),

    devTools: DebugConfig.withDevTools,
  })

  const { persistor: clientPersistor, client } = createClient({ store })

  let sagaManager = sagaMiddleware.run(rootSaga, client)

  if (module.hot) {
    module.hot.accept('./slices', () => {
      const nextRootReducer = require('./slices').default // eslint-disable-line global-require
      const nextPersistedReducer = persistReducer(ReduxPersistConfig.rootConfig, nextRootReducer)

      store.replaceReducer(nextPersistedReducer)
    })

    module.hot.accept('./sagas', () => {
      const nextRootSaga = require('./sagas').default // eslint-disable-line global-require

      sagaManager.cancel()
      sagaManager.toPromise().then(() => {
        sagaManager = sagaMiddleware.run(nextRootSaga)
      })
    })
  }

  const storePersistor = persistStore(store)

  return { store, client, storePersistor, clientPersistor }
}
