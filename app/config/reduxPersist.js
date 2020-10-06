import AsyncStorage from '@react-native-community/async-storage'

export default {
  rootConfig: {
    key: 'root',
    version: -1,
    storage: AsyncStorage,
    whitelist: ['session', 'theme', 'i18n'],
  },
}
