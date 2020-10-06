import React from 'react'
import PT from 'prop-types'

import { Container } from './styles'

const Icon = ({ glyph, ...props }) => {
  return <Container {...props} source={glyph} />
}

Icon.propTypes = {
  glyph: PT.number.isRequired,
}

export { Icon }
