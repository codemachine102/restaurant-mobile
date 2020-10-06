import styled, { css } from 'styled-components/native'
import { fontSize, space, color, borderRadius, borderColor } from 'styled-system'

import { getColor, fontFamilyComposite } from 'theme'

import { Box } from '../Box'
import { FieldLabel as FieldLabelUI } from '../FieldLabel'
import { FieldBottom as FieldBottomUI } from '../FieldBottom'

export const Container = styled(Box)``

export const Input = styled.TextInput.attrs((props) => {
  return {
    bg: props.isDisabled ? 'gray80' : 'paperWhite20',
    color: 'text',
    selectionColor: getColor('emerald100')(props),
    placeholderTextColor: getColor('gray100')(props),
    px: 4,
    py: props.multiline ? 3 : 0,
    height: props.multiline ? 100 : 32,
    borderRadius: 1,
    fontSize: 1,
    fontFamilyGroup: 'variants.primary.group',
    fontFamilyStyle: 'variants.primary.style',
    editable: !props.isDisabled,
    textAlign: props.isCentered ? 'center' : 'left',
    textAlignVertical: props.multiline ? 'top' : 'center',
  }
})`
  border-width: 1;

  ${(props) => {
    return css`
      border-color: ${getColor(props.isFocused ? 'emerald100' : 'gray80')(props)};
    `
  }}

  ${(props) => {
    return (
      props.isDisabled &&
      css`
        background-color: ${getColor('gray80')};
        color: ${getColor('gray100')};
      `
    )
  }}

  ${(props) => {
    return (
      props.hasError &&
      css`
        border-color: ${getColor('negative')(props)};
      `
    )
  }}

  ${space}
  ${color}
  ${fontSize}
  ${borderRadius}
  ${borderColor}
  ${fontFamilyComposite}
`

export const FieldLabel = styled(FieldLabelUI).attrs(() => {
  return {
    mb: 2,
  }
})`
  ${space}
`

export const FieldBottom = styled(FieldBottomUI).attrs(() => {
  return {
    mt: 2,
  }
})`
  ${space}
`
