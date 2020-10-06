import { ApolloLink } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import { mainRequestLink } from './mainRequest'
import { mainSubscriptionLink } from './mainSubscription'

const hasSubscriptionOperation = ({ query }) => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}

export const requestLink = () => {
  return ApolloLink.split(hasSubscriptionOperation, mainSubscriptionLink, mainRequestLink)
}
