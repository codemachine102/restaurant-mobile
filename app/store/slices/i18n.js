/* eslint no-param-reassign: 0 */

import { createSlice, createSelector } from '@reduxjs/toolkit'

import i18n from 'i18n'

const initialState = {
  locale: i18n.getLocale(),
}

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.locale = payload
    },
  },
})

export const { setLocale } = i18nSlice.actions

export default i18nSlice.reducer

export const selectI18nState = (state) => {
  return state.i18n
}

export const selectLocale = createSelector(selectI18nState, (state) => {
  return state.locale
})
