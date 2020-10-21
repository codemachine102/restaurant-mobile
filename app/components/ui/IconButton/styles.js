import styled, { css } from 'styled-components/native'
import { space, border } from 'styled-system'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'

import { getColor, mapToTheme } from 'theme'

import { Box } from '../Box'
import { Icon as IconUI } from '../Icon'

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
  ${(props) => {
    return props.small
      ? css`
          height: 48px;
          width: 48px;
        `
      : css`
          height: 56px;
          width: 56px;
        `
  }}
  justify-content: center;
  align-items: center;
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
})``

export const Icon = styled(IconUI).attrs((props) => {
  const {
    isDisabled,
    iconProps: { glyph },
  } = props

  return {
    glyph,
    tintColor: isDisabled ? getColor('night100')(props) : 'white',
  }
})`
  ${({ iconProps: { h, w } }) => {
    return css`
      height: ${h}px;
      width: ${w}px;
    `
  }}
`
