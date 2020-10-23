import styled from 'styled-components/native'
import { space } from 'styled-system'

import { Text, TouchableOpacity, Box } from 'components/ui'
import { mapToTheme } from 'styled-map'
import { FieldLabel as FieldLabelUI } from '../FieldLabel'

export const InnerContainer = styled(TouchableOpacity).attrs(() => {
  return {
    my: 2,
  }
})`
  flex-direction: row;
  align-items: center;
  ${space}
`

export const Container = styled(Box).attrs(() => {
  return {}
})``

export const Value = styled(Text).attrs(() => {
  return {
    ml: 3,
    mr: 5,
  }
})``

export const Outer = styled.View`
  height: 32px;
  width: 32px;
  border-radius: 16;
  align-items: center;
  justify-content: center;
  background-color: ${mapToTheme('components.radio.color.outer')};
`
export const Inner = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8;
  background-color: ${(props) => {
    return props.isChecked
      ? mapToTheme('components.radio.color.inner.selected')
      : mapToTheme('components.radio.color.inner.default')
  }};
`
export const FieldLabel = styled(FieldLabelUI).attrs(() => {
  return {
    mb: 3,
  }
})`
  ${space}
`
