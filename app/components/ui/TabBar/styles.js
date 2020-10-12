import styled from 'styled-components/native'

import { Box } from '../Box'

export { TabItem } from './TabItem'

export const Container = styled(Box).attrs(() => {
  return {
    p: 2,
    borderRadius: 3,
    borderColor: 'night50',
    bg: 'night100',
  }
})`
  border-width: 1px;
  flex-direction: row;
  flex-shrink: 1;
`

export const ItemSeparator = styled(Box).attrs(() => {
  return {
    ml: 2,
  }
})``
