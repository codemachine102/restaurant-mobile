import styled, { css } from 'styled-components/native'
import { space, border, layout } from 'styled-system'
import LinearGradient from 'react-native-linear-gradient'

import { getColor, mapToTheme } from 'theme'

import { Box } from '../Box'
import { Icon as IconUI } from '../Icon'
import { TouchableWithoutFeedback } from '../TouchableWithoutFeedback'

export const Container = styled(TouchableWithoutFeedback)``

const InnerBase = styled.View.attrs((props) => {
  return {
    px: 5,
    borderRadius: 3,
    size: props.isSmall ? 48 : 56,
  }
})`
  align-items: center;
  justify-content: center;

  ${border}
  ${layout}
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
        background-color: ${mapToTheme('components.iconButton.isPressed.inner.bg')};
      `
    }

    if (props.isOutlined) {
      return css`
        border-width: 1px;
        border-color: ${mapToTheme('components.iconButton.isOutlined.inner.border')};
      `
    }

    return null
  }}
`

export const InnerGradient = styled(InnerBase.withComponent(LinearGradient)).attrs((props) => {
  return {
    colors: [
      mapToTheme('components.iconButton.innerGradient.bg.color1')(props),
      mapToTheme('components.iconButton.innerGradient.bg.color2')(props),
    ],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }
})``

export const Icon = styled(IconUI).attrs((props) => {
  return {
    tintColor: props.isDisabled ? getColor('night100')(props) : 'white',
  }
})``
