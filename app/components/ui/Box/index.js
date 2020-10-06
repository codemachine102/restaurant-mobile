import styled from 'styled-components/native'
import { space, color, layout, flexbox, border, position } from 'styled-system'

import { shadowComposite } from 'theme'

const Box = styled.View`
  ${border}
  ${color}
  ${flexbox}
  ${layout}
  ${position}
  ${space}
  ${shadowComposite}
`

export { Box }
