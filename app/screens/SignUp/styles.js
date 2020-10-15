import styled from 'styled-components/native'

import { logoImage } from 'assets/images'

import { Box, Text, Image } from 'components/ui'

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
  padding-top: 15%;
  padding-bottom: 10%;
`

export const Bottom = styled.View`
  justify-content: flex-end;
`

export const Inner = styled.View``

export const Content = styled.View``

export const Footer = styled(Box).attrs(() => {
  return {
    mt: 7,
    px: 11,
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

export const Usage = styled(Text)`
  width: 70%;
`

export const TimerText = styled(Text).attrs(() => {
  return {
    color: 'persimmon100',
  }
})``

export const ResendText = styled(Text).attrs(() => {
  return {
    color: 'persimmon100',
  }
})``
