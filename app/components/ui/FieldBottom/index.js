import React from 'react'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Container, FieldError } from './styles'

const FieldBottom = ({ error, isErrorMessageHidden, style }) => {
  let content = null

  if (error && !isErrorMessageHidden) {
    content = <FieldError {...{ error }} />
  }

  if (!content) {
    return null
  }

  return <Container {...{ style }}>{content}</Container>
}

FieldBottom.propTypes = {
  error: PT.oneOfType([PT.array, PT.string]),
  isErrorMessageHidden: PT.bool,
  style: ViewPropTypes.style,
}

FieldBottom.defaultProps = {
  error: null,
  isErrorMessageHidden: false,
  style: {},
}

export { FieldBottom }
