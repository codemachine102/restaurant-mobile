import styled from 'styled-components/native'

import { arrowIcon } from 'assets/images'

import { Text, Icon, TouchableOpacity } from 'components/ui'

export {
  Container,
  Scrollable,
  Top,
  Logo,
  LogoContainer,
  Middle,
  Title,
  Description,
  Instruction,
  Bottom,
  Form,
  FormSpy,
  FormField,
  FormTextInput,
  Inner,
  Content,
  Footer,
  Button,
} from 'screens/common/auth'
export { Resend } from './Resend'

export const BackToSignIn = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`

export const BackToSignInText = styled(Text).attrs(() => {
  return {
    color: 'persimmon75',
  }
})``

export const BackToSignInIcon = styled(Icon).attrs(() => {
  return {
    mr: 3,
    glyph: arrowIcon,
    tintColor: 'persimmon75',
  }
})`
  width: 14px;
  height: 10px;
`
