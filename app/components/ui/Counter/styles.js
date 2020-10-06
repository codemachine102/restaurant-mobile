import styled from 'styled-components/native'

import { Box } from '../Box'
import { Text } from '../Text'

export const Container = styled(Box).attrs(() => {
  return {
    p: 1,
    bg: 'negative',
    borderRadius: 2,
  }
})`
  height: 16px;
  min-width: 16px;
  align-items: center;
  justify-content: center;
`

export const Count = styled(Text).attrs(() => {
  return {
    fontSize: '10px',
    lineHeight: '12px',
    fontFamilyStyle: 'style.bold',
    color: 'white',
  }
})``
