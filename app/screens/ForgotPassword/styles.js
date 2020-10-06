import styled from 'styled-components/native'

import { Box, Link, Text } from 'components/ui'

export { Form, Field } from 'react-final-form'
export { Container, Scrollable } from 'components/common'
export { FormTextInput } from 'components/blocks'
export { Button } from 'components/ui'

export const Top = styled.View`
  flex-grow: 1;
`

export const Bottom = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const Inner = styled.View``

export const Content = styled.View``

export const Footer = styled(Box).attrs(() => {
  return {
    mt: 8,
  }
})``

export const LinkButton = styled(Link).attrs(() => {
  return {
    messageProps: {
      fontFamilyStyle: 'style.semiBold',

      style: {
        textAlign: 'center',
      },
    },
  }
})``

export const Instruction = styled(Text).attrs(() => {
  return {
    mb: 5,
    color: 'gray100',
  }
})`
  text-align: center;
`
