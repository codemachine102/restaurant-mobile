import { WebSocketLink } from 'apollo-link-ws'

import ServicesConfig from 'config/services'

export const mainSubscriptionLink = new WebSocketLink({
  uri: `${ServicesConfig.api.mainSubscriptionUrl}/subscriptions`,
  options: { reconnect: true },
  credentials: 'include',
})
