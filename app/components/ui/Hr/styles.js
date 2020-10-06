import styled from 'styled-components/native'
import { color, layout } from 'styled-system'

import DashRN from 'react-native-dash'

import { getColor } from 'theme'

export const Line = styled.View.attrs((props) => {
  return {
    bg: props.color,
    height: props.thickness,
  }
})`
  ${color}
  ${layout}
`

export const Dash = styled(DashRN).attrs((props) => {
  return {
    dashColor: getColor(props.color)(props),
    dashThickness: props.thickness,
  }
})``
