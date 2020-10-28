import styled from 'styled-components/native'

import { Text, Link } from 'components/ui'

export { FormRadio } from 'components/blocks'
export {
  Container,
  Scrollable,
  Top,
  Logo,
  LogoContainer,
  TabBar,
  Middle,
  Title,
  Description,
  Instruction,
  Bottom,
  Inner,
  Content,
  Form,
  FormField,
  FormTextInput,
  Footer,
  Button,
  TAB_HASH,
} from 'screens/common/auth'

export const InstructionHighlight = styled(Text).attrs(() => {
  return {
    fontFamilyGroup: 'group.bfast',
  }
})``

export const ForgotPassword = styled(Link).attrs(() => {
  return {
    variant: 'neutral',

    messageProps: {
      style: {
        textAlign: 'center',
      },
    },
  }
})``
