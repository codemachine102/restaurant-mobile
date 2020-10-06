import Secrets from 'react-native-config'

const api = {
  mainRequestUrl: `https://${Secrets.API_MAIN_URL}`,
  mainSubscriptionUrl: `wss://${Secrets.API_MAIN_URL}`,
}

export default {
  api,
}
