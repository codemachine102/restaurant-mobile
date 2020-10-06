import { setContext } from 'apollo-link-context'

import { selectJWTHeader } from 'store/slices/session'

import merge from 'lodash/merge'

export const authLink = ({ store }) => {
  return setContext((_, prevContext) => {
    const JWTHeader = selectJWTHeader(store.getState())

    return merge(
      {},
      prevContext,
      JWTHeader && {
        headers: {
          authorization: JWTHeader,
        },
      },
    )
  })
}
