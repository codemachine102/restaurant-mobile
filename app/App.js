import React, { useState, useEffect, useCallback } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'
import SplashScreen from 'react-native-splash-screen'

import createStore from 'store'

import i18n from 'i18n'

import { StatefulNavigation } from 'navigation'

import { selectLocale } from 'store/slices/i18n'

const { store, client, storePersistor, clientPersistor } = createStore()

const App = () => {
  const [isRehydrated, setIsRehydrated] = useState(false)

  const onBeforeLift = useCallback(() => {
    const locale = selectLocale(store.getState())
    i18n.setup(locale)
  }, [])

  useEffect(() => {
    clientPersistor().then(() => {
      setIsRehydrated(true)
      SplashScreen.hide()
    })
  }, [setIsRehydrated])

  return (
    <Provider {...{ store }}>
      <ApolloProvider {...{ client }}>
        <PersistGate {...{ onBeforeLift }} persistor={storePersistor} loading={null}>
          {isRehydrated && <StatefulNavigation />}
        </PersistGate>
      </ApolloProvider>
    </Provider>
  )
}

export default App
