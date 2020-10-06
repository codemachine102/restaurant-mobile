import styled from 'styled-components/native'

import { Text } from '../Text'

export const Container = styled.View``

export const Label = styled(Text).attrs(() => {
  return {
    numberOfLines: 1,
  }
})``
