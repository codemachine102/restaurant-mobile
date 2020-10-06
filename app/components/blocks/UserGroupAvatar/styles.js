import styled from 'styled-components/native'

import { Box, Text } from 'components/ui'

export { UserAvatar as Container } from '../UserAvatar'

export const CapOverlay = styled(Box).attrs(() => {
  return {
    bg: 'overlay',
  }
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`

export const Cap = styled(Text).attrs(() => {
  return {
    fontFamilyStyle: 'style.bold',
    color: 'white',
  }
})``
