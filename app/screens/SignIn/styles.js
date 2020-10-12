import styled from 'styled-components/native'

import { logoImage } from 'assets/images'

import { Box, Link, Text, Image } from 'components/ui'

export { Form } from 'react-final-form'
export { Container, Scrollable } from 'components/common'
export { FormField, FormTextInput } from 'components/blocks'
export { Button, TabBar } from 'components/ui'

export const Top = styled(Box).attrs(() => {
  return {
    py: 4,
  }
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Middle = styled.View`
  flex-grow: 1;
  padding-top: 20%;
`

export const Bottom = styled.View`
  justify-content: flex-end;
`

export const Inner = styled.View``

export const Content = styled.View``

export const Footer = styled(Box).attrs(() => {
  return {
    mt: 7,
  }
})``

export const LogoContainer = styled(Box).attrs(() => {
  return {
    size: 56,
    borderRadius: 3,
    borderColor: 'night50',
  }
})`
  border-width: 1px;
  align-items: center;
  justify-content: center;
`

export const Logo = styled(Image).attrs(() => {
  return {
    source: logoImage,
  }
})`
  width: 40px;
  height: 29px;
`

export const Title = styled(Text).attrs(() => {
  return {
    mb: 4,
    fontSize: 3,
    fontFamilyGroup: 'group.bfast',
    color: 'persimmon100',
  }
})``

export const Motto = styled(Text).attrs(() => {
  return {
    mb: 4,
    fontSize: 2,
    fontFamilyGroup: 'group.bfast',
  }
})``

export const Usage = styled(Text)``

export const UsageHighlight = styled(Text).attrs(() => {
  return {
    fontFamilyGroup: 'group.bfast',
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
