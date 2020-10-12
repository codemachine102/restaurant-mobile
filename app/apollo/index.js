import AsyncStorage from '@react-native-community/async-storage'
import { ApolloClient } from '@apollo/client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'

import { authLink, requestLink } from './links'

if (__DEV__) {
  global.AsyncStorage = AsyncStorage
}

export default function createClient({ store }) {
  const cache = new InMemoryCache()

  // TODO: Monkey-patching in a fix for an open issue suggesting that
  //       `readQuery` should return null or undefined if the query is not yet
  //       in the cache: https://github.com/apollographql/apollo-feature-requests/issues/1
  cache.originalReadQuery = cache.readQuery
  cache.readQuery = (...args) => {
    try {
      return cache.originalReadQuery(...args)
    } catch (err) {
      return undefined
    }
  }

  const client = new ApolloClient({
    cache,

    link: ApolloLink.from([
      // tokenRefreshLink({ store }),
      authLink({ store }),
      requestLink({ store }),
    ]),
  })

  return {
    client,

    persistor: async () => {
      const persistor = new CachePersistor({
        cache,
        storage: AsyncStorage,
        trigger: 'background',
      })

      await persistor.restore()

      client.onClearStore(async () => {
        persistor.purge()
      })
    },
  }
}
