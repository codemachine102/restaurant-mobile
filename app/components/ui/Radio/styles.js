import styled, { css } from 'styled-components/native'

import { mapToTheme } from 'theme'

import { Box } from '../Box'
import { Text } from '../Text'
import { TouchableWithoutFeedback } from '../TouchableWithoutFeedback'

export const Container = styled(TouchableWithoutFeedback)`
  flex-direction: row;
  align-items: center;
`

export const OuterCircle = styled(Box).attrs((props) => {
  return {
    size: 32,
    borderRadius: 4,
    borderColor: 'night50',
    bg: mapToTheme('components.radio.outerCircle.bg')(props),
  }
})`
  border-width: 1px;
  align-items: center;
  justify-content: center;
`

export const InnerCircle = styled(Box).attrs((props) => {
  return {
    size: 16,
    borderRadius: 3,
    borderColor: mapToTheme('components.radio.innerCircle.borderColor')(props),
    bg: mapToTheme('components.radio.innerCircle.bg')(props),
  }
})`
  border-width: 1px;

  ${(props) => {
    return (
      props.isChecked &&
      css`
        border-color: ${mapToTheme('components.radio.isChecked.innerCircle.borderColor')};
        background-color: ${mapToTheme('components.radio.isChecked.innerCircle.bg')};
      `
    )
  }}

  ${(props) => {
    return (
      props.isPressed &&
      css`
        border-color: ${mapToTheme('components.radio.isPressed.innerCircle.borderColor')};
        background-color: ${mapToTheme('components.radio.isPressed.innerCircle.bg')};
      `
    )
  }}
`

export const Label = styled(Text).attrs(() => {
  return {
    ml: 4,
    numberOfLines: 1,
  }
})`
  flex-shrink: 1;
`
