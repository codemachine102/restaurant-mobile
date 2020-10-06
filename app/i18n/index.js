import i18n from 'i18n-js'

import * as RNLocalize from 'react-native-localize'

import find from 'lodash/find'
import has from 'lodash/has'
import map from 'lodash/map'
import memoize from 'lodash/memoize'

import en from './languages/en.json'
import fr from './languages/fr.json'

const LOCALE = 'en'
const TRANSLATIONS = { en, fr }

const t = memoize(
  (key, config) => {
    return i18n.t(key, config)
  },
  (key, config) => {
    return config ? key + JSON.stringify(config) : key
  },
)

const isLocaleSupported = (locale) => {
  return has(TRANSLATIONS, locale.toLowerCase())
}

const getLocale = () => {
  return find(map(RNLocalize.getLocales(), 'languageCode'), isLocaleSupported) || LOCALE
}

const setLocale = (locale) => {
  if (isLocaleSupported(locale)) {
    i18n.locale = locale
    t.cache.clear()
  }
}

const setup = (locale) => {
  // NOTE: Clear translation cache
  t.cache.clear()

  // NOTE: Set i18n-js config
  i18n.locale = locale
  i18n.translations = TRANSLATIONS
  i18n.missingTranslation = (key) => {
    return `![${key}]`
  }
}

export default {
  getLocale,
  setLocale,
  setup,
  t,
}
