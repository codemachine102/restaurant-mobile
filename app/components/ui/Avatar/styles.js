import styled from 'styled-components/native'

import { mapToTheme } from 'theme'

import { Box } from '../Box'
import { Icon } from '../Icon'
import { Image } from '../Image'
import { Text } from '../Text'

export { Counter } from '../Counter'

export const Container = styled(Box).attrs(() => {
  return {
    p: 1,
  }
})`
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  background-color: ${mapToTheme('components.avatar.container.bg')};
`

export const Placeholder = styled(Text).attrs((props) => {
  return {
    numberOfLines: 1,
    lineHeight: null,
    fontFamilyStyle: 'style.bold',

    color:
      props.variant === 'secondary'
        ? mapToTheme('components.avatar.placeholder.color')(props)(props)
        : props.textColor,
  }
})``

export const PlaceholderIcon = styled(Icon)`
  tint-color: ${mapToTheme('components.avatar.placeholderIcon.tintColor')};
`

export const Photo = styled(Image).attrs(() => {
  return {
    bg: 'white',
  }
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const CounterContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`
