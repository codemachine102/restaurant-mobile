import AsyncStorage from '@react-native-community/async-storage'

export default {
  rootConfig: {
    key: 'root',
    version: 0,
    storage: AsyncStorage,
    whitelist: ['theme', 'i18n'],
  },
}
