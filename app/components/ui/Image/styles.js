import styled from 'styled-components/native'
import { space, color, layout } from 'styled-system'
import FastImage from 'react-native-fast-image'

import { tintColor } from 'theme'

export const Container = styled(FastImage)`
  ${color}
  ${layout}
  ${space}
  ${tintColor}
`
