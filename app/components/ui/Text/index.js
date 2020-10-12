import styled from 'styled-components/native'
import { space, color, typography, layout, flexbox, position } from 'styled-system'
import { defaultProps } from 'recompose'

import { fontFamilyComposite, lineHeightComposite } from 'theme'

const Text = defaultProps({
  bg: 'clear',
  color: 'text',
  fontFamilyGroup: 'group.sfProDisplay',
  fontFamilyStyle: 'style.regular',
  fontSize: 1,
  allowFontScaling: false,
})(
  styled.Text`
    ${space}
    ${color}
    ${typography}
    ${layout}
    ${flexbox}
    ${position}
    ${fontFamilyComposite}
    ${lineHeightComposite}
  `,
)

export { Text }
