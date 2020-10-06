import styled from 'styled-components/native'

import { UIActivityIndicator } from 'react-native-indicators'

import { getColor } from 'theme'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Indicator = styled(UIActivityIndicator).attrs((props) => {
  return {
    color: getColor('emerald100')(props),
  }
})``
