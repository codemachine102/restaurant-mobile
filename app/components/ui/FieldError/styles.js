import styled from 'styled-components/native'

import { Box } from '../Box'
import { Text } from '../Text'

export const Container = styled(Box)``

export const Message = styled(Text).attrs(() => {
  return {
    fontSize: 0,
    color: 'bittersweet',
    numberOfLines: 2,
  }
})``
