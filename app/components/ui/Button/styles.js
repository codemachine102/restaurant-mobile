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
    if (props.isDisabled) {
      return props.isOutlined
        ? css`
            border-width: 1px;
            border-color: ${getColor('night50')};
          `
        : css`
            background-color: ${getColor('night50')};
          `
    }

    if (props.isPressed) {
      return css`
        background-color: ${mapToTheme('components.button.isPressed.inner.bg')};
      `
    }

    if (props.isOutlined) {
      return css`
        border-width: 1px;
        border-color: ${mapToTheme('components.button.isOutlined.inner.border')};
      `
    }

    return null
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
  }
})`
  ${(props) => {
    if (props.isDisabled) {
      return props.isOutlined
        ? css`
            color: ${getColor('night50')};
          `
        : css`
            color: ${getColor('night100')};
          `
    }

    if (props.isPressed) {
      return css`
        color: ${getColor('white')};
      `
    }

    if (props.isOutlined) {
      return css`
        color: ${mapToTheme('components.button.isOutlined.title.color')};
      `
    }

    return css`
      color: ${getColor('white')};
    `
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
