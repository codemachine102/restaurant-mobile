import styled from 'styled-components/native'

import { Box, FieldLabel } from 'components/ui'

export const Container = styled(Box).attrs((props) => {
  return {
    mt: props.mt || 5,
  }
})``

export const RadioContainer = styled(Box).attrs(() => {
  return {
    my: 3,
  }
})`
  flex: 1;
  flex-direction: row;
  align-items: center;
`
export const GroupLabel = styled(FieldLabel)``
