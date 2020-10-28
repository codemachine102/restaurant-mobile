import styled from 'styled-components/native'
import { space } from 'styled-system'

import { Box } from '../Box'
import { FieldLabel as FieldLabelUI } from '../FieldLabel'
import { FieldBottom as FieldBottomUI } from '../FieldBottom'

export { OptionItem } from './OptionItem'

export const Container = styled(Box)``

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

export const ItemSeparator = styled(Box).attrs((props) => {
  return {
    ml: props.isHorizontal ? 3 : 0,
    mt: props.isHorizontal ? 0 : 3,
  }
})``

export const OptionListContainer = styled.View`
  flex-direction: ${(props) => {
    return props.isHorizontal ? 'row' : 'column'
  }};
`
