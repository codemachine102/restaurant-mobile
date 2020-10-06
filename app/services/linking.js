import { Alert, Linking } from 'react-native'

const WWW_URL_PATTERN = /^www\./i

const navigateToUrl = ({ url }) => {
  const normalizedUrl = (url || '').toLowerCase()

  if (WWW_URL_PATTERN.test(normalizedUrl)) {
    navigateToUrl(`http://${normalizedUrl}`)
  } else {
    try {
      Linking.canOpenURL(normalizedUrl).then((supported) => {
        if (!supported) {
          // eslint-disable-next-line
          console.error('No handler for URL:', normalizedUrl)
        } else {
          Linking.openURL(normalizedUrl)
        }
      })
    } catch (e) {
      Alert.alert('URL cannot be opened')
    }
  }
}

export default {
  navigateToUrl,
}
