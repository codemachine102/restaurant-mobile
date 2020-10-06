import styled, { css } from 'styled-components/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { mapToTheme } from 'theme'

import { Text } from '../Text'

export const Container = styled(TouchableWithoutFeedback)``

export const Message = styled(Text)`
  color: ${mapToTheme('components.generic.color')};
  text-decoration-color: ${mapToTheme('components.generic.color')};

  ${(props) => {
    return (
      props.isPressed &&
      css`
        color: ${mapToTheme('components.generic.isPressed.color')};
        text-decoration-color: ${mapToTheme('components.generic.isPressed.color')};
        text-decoration-line: underline;
      `
    )
  }}
`
