import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'

import 'config/global'
import AppConfig from 'config/app'

import App from './app/App'

AppRegistry.registerComponent(AppConfig.bundleName, () => {
  return App
})
