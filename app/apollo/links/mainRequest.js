import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { BatchHttpLink } from 'apollo-link-batch-http'

import ServicesConfig from 'config/services'

const uri = `${ServicesConfig.api.mainRequestUrl}/graphql`

const batchHttpLink = new BatchHttpLink({ uri, headers: { batch: 'true' } })
const httpLink = new HttpLink({ uri })

const hasBatchOperation = (operation) => {
  return operation.getContext().batch === true
}

export const mainRequestLink = ApolloLink.split(hasBatchOperation, batchHttpLink, httpLink)
