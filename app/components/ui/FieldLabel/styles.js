import styled from 'styled-components/native'

import { Text } from '../Text'

export const Container = styled.View``

export const Label = styled(Text).attrs(() => {
  return {
    fontSize: 0,
    color: 'gray100',
    numberOfLines: 1,
    fontFamilyStyle: 'style.medium',
  }
})``
