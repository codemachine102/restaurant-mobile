import React from 'react'
import PT from 'prop-types'

import isArray from 'lodash/isArray'

import { ViewPropTypes } from 'constants/propTypes'

import { Container, Message } from './styles'

const FieldError = ({ error, style }) => {
  return (
    <Container {...{ style }}>
      <Message>— {isArray(error) ? error[0] : error}</Message>
    </Container>
  )
}

FieldError.propTypes = {
  error: PT.oneOfType([PT.string, PT.array]).isRequired,
  style: ViewPropTypes.style,
}

FieldError.defaultProps = {
  style: {},
}

export { FieldError }
