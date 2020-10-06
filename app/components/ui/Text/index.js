import PT from 'prop-types'

import styled from 'styled-components/native'
import { space, color, fontSize } from 'styled-system'

import { fontFamilyComposite, lineHeightComposite } from 'theme'

import appConfig from 'config/app'

const Text = styled.Text`
  ${color}
  ${space}
  ${fontSize}
  ${fontFamilyComposite}
  ${lineHeightComposite}
`

Text.propTypes = {
  allowFontScaling: PT.bool,
  bg: PT.string,
  color: PT.string,
  fontFamilyGroup: PT.string,
  fontFamilyStyle: PT.string,
  fontSize: PT.number,
}

Text.defaultProps = {
  allowFontScaling: appConfig.allowTextFontScaling,
  bg: 'clear',
  color: 'text',
  fontFamilyGroup: 'group.sourceSansPro',
  fontFamilyStyle: 'style.regular',
  fontSize: 1,
}

export { Text }
