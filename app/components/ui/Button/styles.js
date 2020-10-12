import styled, { css } from 'styled-components/native'
import { space, border } from 'styled-system'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { UIActivityIndicator } from 'react-native-indicators'
import LinearGradient from 'react-native-linear-gradient'

import { getColor, mapToTheme } from 'theme'

import { Box } from '../Box'
import { Text } from '../Text'

export const Container = styled(TouchableWithoutFeedback).attrs((props) => {
  return {
    disabled: props.isDisabled,
  }
})``

const InnerBase = styled.View.attrs(() => {
  return {
    px: 5,
    borderRadius: 3,
  }
})`
  height: 56px;
  min-width: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${border}
  ${space}
`

export const InnerFlat = styled(InnerBase.withComponent(Box))`
  ${(props) => {
    return (
      props.isPressed &&
      css`
        border-width: 1px;
        border-color: ${mapToTheme('components.button.isPressed.innerFlat.border')};
        background-color: ${mapToTheme('components.button.isPressed.innerFlat.bg')};
      `
    )
  }}

  ${(props) => {
    return (
      props.isDisabled &&
      css`
        background-color: ${getColor('night50')};
      `
    )
  }}
`

export const InnerGradient = styled(InnerBase.withComponent(LinearGradient)).attrs((props) => {
  return {
    colors: [
      mapToTheme('components.button.innerGradient.bg.color1')(props),
      mapToTheme('components.button.innerGradient.bg.color2')(props),
    ],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }
})`
  height: 56px;
  min-width: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled(Text).attrs(() => {
  return {
    numberOfLines: 1,
    color: 'white',
  }
})`
  ${(props) => {
    return (
      props.isDisabled &&
      css`
        color: ${getColor('night100')};
      `
    )
  }}
`

export const ProgressIndicator = styled(UIActivityIndicator).attrs(() => {
  return {
    color: 'white',
    size: 28,
  }
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
