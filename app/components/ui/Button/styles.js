import styled, { css } from 'styled-components/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { UIActivityIndicator } from 'react-native-indicators'

import { getColor, mapToTheme } from 'theme'

import { Box } from '../Box'
import { Text } from '../Text'

export const Container = styled(TouchableWithoutFeedback).attrs((props) => {
  return {
    disabled: props.isDisabled,
  }
})``

export const Inner = styled(Box).attrs(() => {
  return {
    px: 5,
  }
})`
  height: 40px;
  min-width: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${mapToTheme('components.generic.color')};

  ${(props) => {
    return (
      props.isPressed &&
      css`
        background-color: ${mapToTheme('components.generic.isPressed.color')};
      `
    )
  }}

  ${(props) => {
    return (
      props.isDisabled &&
      css`
        background-color: ${getColor('gray80')};
      `
    )
  }}
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
        color: ${getColor('gray100')};
      `
    )
  }}
`
export const ProgressIndicator = styled(UIActivityIndicator).attrs(() => {
  return {
    color: 'white',
    size: 20,
  }
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
