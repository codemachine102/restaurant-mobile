import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode from 'jwt-decode'

import identity from 'lodash/identity'

// import { refresh } from 'services/api/queries/auth'

import {
  selectToken,
  selectRefreshToken,
  logOutRequest,
  refreshTokenSuccess,
} from 'store/slices/session'

export const tokenRefreshLink = ({ store }) => {
  return new TokenRefreshLink({
    accessTokenField: 'accessToken',

    isTokenValidOrUndefined: () => {
      const token = selectToken(store.getState())

      if (!token) {
        return true
      }

      try {
        const { exp } = jwtDecode(token)
        return Date.now() < exp * 1000
      } catch (err) {
        return false
      }
    },

    fetchAccessToken: () => {
      console.log('refresh')
      // const refreshToken = selectRefreshToken(store.getState())
      // return refresh({ refreshToken })
    },

    handleResponse: () => {
      return identity
    },

    handleFetch: (accessToken) => {
      store.dispatch(refreshTokenSuccess(accessToken))
    },

    handleError: () => {
      store.dispatch(logOutRequest())
    },
  })
}
