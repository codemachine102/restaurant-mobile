import styled, { css } from 'styled-components/native'

import { getColor } from 'theme'

import { Box } from '../../Box'
import { Text } from '../../Text'
import { TouchableOpacity } from '../../TouchableOpacity'

export const Container = styled(Box.withComponent(TouchableOpacity)).attrs(() => {
  return {
    px: 6,
    borderRadius: 3,
  }
})`
  height: 32px;
  align-items: center;
  justify-content: center;

  ${(props) => {
    return (
      props.isActive &&
      css`
        border-width: 1px;
        border-color: ${getColor('night50')};
        background-color: ${getColor('night75')};
      `
    )
  }}

  ${(props) => {
    return (
      props.isFluid &&
      css`
        flex: 1;
      `
    )
  }}
`

export const Label = styled(Text).attrs(() => {
  return {
    color: 'night50',
    numberOfLines: 1,
  }
})`
  ${(props) => {
    return (
      props.isActive &&
      css`
        color: ${getColor('white')};
      `
    )
  }}
`
