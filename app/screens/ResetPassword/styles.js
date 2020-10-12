import styled from 'styled-components/native'
import { Link } from 'components/ui'

export * from '../SignIn/styles'

export const BackToSignInLink = styled(Link).attrs(() => {
  return {
    messageProps: {
      style: {
        textAlign: 'right',
      },
    },
  }
})``
