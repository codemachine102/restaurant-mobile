import styled, { css } from 'styled-components/native'

import { getColor } from 'theme'

import { Text } from '../Text'

export const Container = styled.View``

export const Label = styled(Text).attrs(() => {
  return {
    color: 'night50',
    numberOfLines: 1,
  }
})`
  ${(props) => {
    return (
      props.isFocused &&
      css`
        color: ${getColor('white')};
      `
    )
  }}
`
