import Secrets from 'react-native-config'
import VersionNumber from 'react-native-version-number'

import { name as bundleName } from '../../app.json'

export default {
  bundleName,
  isProduction: Secrets.IS_PRODUCTION === 'true',
  isHermesEnabled: global.HermesInternal != null,
  version: VersionNumber.appVersion,
  buildVersion: VersionNumber.buildVersion,
  bundleIdentifier: VersionNumber.bundleIdentifier,
  appearance: { theme: 'main' },
  credentials: {
    phone: __DEV__ ? Secrets.AUTH_PHONE : '',
    password: __DEV__ ? Secrets.AUTH_PASSWORD : '',
  },
}
