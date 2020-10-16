import styled from 'styled-components/native'

import { Link, Text } from 'components/ui'

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
  TabBar,
} from '../common/auth'

export const UsageHighlight = styled(Text).attrs(() => {
  return {
    fontFamilyGroup: 'group.bfast',
  }
})``

export const LinkButton = styled(Link).attrs(() => {
  return {
    variant: 'neutral',

    messageProps: {
      style: {
        textAlign: 'center',
      },
    },
  }
})``
