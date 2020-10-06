/* eslint no-param-reassign: 0 */

import { createSlice, createSelector } from '@reduxjs/toolkit'

import { themes } from 'theme'

const initialState = {
  id: 'main',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.id = payload
    },
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer

export const selectThemeState = (state) => {
  return state.theme
}

export const selectTheme = createSelector(selectThemeState, (state) => {
  return themes[state.id]
})
