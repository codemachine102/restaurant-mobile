import styled, { css } from 'styled-components/native'
import { fontSize, space, color, borderRadius, borderColor } from 'styled-system'

import { getColor, fontFamilyComposite } from 'theme'

import { Box } from '../Box'
import { FieldLabel as FieldLabelUI } from '../FieldLabel'
import { FieldBottom as FieldBottomUI } from '../FieldBottom'

export const Container = styled(Box)``

export const Input = styled.TextInput.attrs((props) => {
  return {
    bg: 'night75',
    color: 'white',
    borderColor: 'night50',
    selectionColor: getColor('white')(props),
    placeholderTextColor: getColor(props.isDisabled ? 'night100' : 'night50')(props),
    px: 5,
    py: 0,
    height: 48,
    borderRadius: 3,
    fontSize: 1,
    fontFamilyGroup: 'group.sfProDisplay',
    fontFamilyStyle: 'style.regular',
    editable: !props.isDisabled,
    textAlign: props.isCentered ? 'center' : 'left',
    textAlignVertical: props.multiline ? 'top' : 'center',
  }
})`
  border-width: 1px;

  ${space}
  ${color}
  ${fontSize}
  ${borderRadius}
  ${borderColor}
  ${fontFamilyComposite}

  ${(props) => {
    return (
      props.isDisabled &&
      css`
        background-color: ${getColor('night50')};
        color: ${getColor('night100')};
      `
    )
  }}

  ${(props) => {
    return (
      props.hasError &&
      css`
        color: ${getColor('negative')(props)};
        border-color: ${getColor('negative')(props)};
      `
    )
  }}
`

export const FieldLabel = styled(FieldLabelUI).attrs(() => {
  return {
    mb: 3,
  }
})`
  ${space}
`

export const FieldBottom = styled(FieldBottomUI).attrs(() => {
  return {
    mt: 3,
  }
})`
  ${space}
`
