/* eslint no-param-reassign: 0 */

import { createSlice, createSelector } from '@reduxjs/toolkit'

import noop from 'lodash/noop'

const initialState = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGZiZGU4Mi1iZTRlLTQ4YzQtYTZjNi1lMzQ3NGE3YWM2NjEiLCJrZXkiOiJWUFBUV1ZEajlNdkoiLCJpYXQiOjE2MDE5OTY5MzIsImV4cCI6MTYwMjA4MzMzMn0.MUAvWGZkCB0mhsJwQ5igd2b02muW3T8til19gaHthXA',
  refreshToken: null,
}

const resetState = () => {
  return initialState
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signInSuccess: (state, { payload }) => {
      state.token = payload.token
      state.refreshToken = payload.refreshToken
    },
    refreshTokenSuccess: (state, { payload }) => {
      state.token = payload
    },
    logOutRequest: noop,
    logOutSuccess: resetState,
  },
})

export const {
  signInSuccess,
  signInFailure,
  logOutRequest,
  logOutSuccess,
  refreshTokenSuccess,
} = sessionSlice.actions

export default sessionSlice.reducer

export const selectSessionState = (state) => {
  return state.session
}

export const selectToken = createSelector(selectSessionState, (state) => {
  return state.token
})

export const selectRefreshToken = createSelector(selectSessionState, (state) => {
  return state.refreshToken
})

export const selectIsAuthenticated = createSelector(selectSessionState, (state) => {
  return !!state.token
})

export const selectJWTHeader = createSelector(selectSessionState, (state) => {
  return state.token ? `Bearer ${state.token}` : null
})
