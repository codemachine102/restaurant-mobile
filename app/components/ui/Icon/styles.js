import styled from 'styled-components/native'
import { space, color, layout } from 'styled-system'

import { Image } from '../Image'

export const Container = styled(Image)`
  max-width: 100%;

  ${color}
  ${space}
  ${layout}
`
