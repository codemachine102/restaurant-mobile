import { combineReducers } from '@reduxjs/toolkit'

import i18nReducer from './i18n'
import sessionReducer from './session'
import themeReducer from './theme'

const rootReducer = combineReducers({
  i18n: i18nReducer,
  session: sessionReducer,
  theme: themeReducer,
})

export default rootReducer
