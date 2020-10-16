import styled from 'styled-components/native'

import { arrowIcon } from 'assets/images'

import { Text, Icon, TouchableOpacity } from 'components/ui'

export {
  Form,
  Container,
  Scrollable,
  FormField,
  FormTextInput,
  TimerText,
  ResendText,
  Logo,
  LogoContainer,
  Top,
  Middle,
  Bottom,
  Footer,
  Motto,
  Inner,
  Content,
  Title,
  Usage,
  Button,
} from '../common/auth'

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
  }
})`
  width: 14px;
  height: 10px;
`
