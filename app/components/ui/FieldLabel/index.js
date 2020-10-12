import React from 'react'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Container, Label } from './styles'

const FieldLabel = ({ label, style, isFocused }) => {
  const labelEl = label ? <Label {...{ isFocused }}>{label === true ? ' ' : label}</Label> : null

  if (!labelEl) {
    return null
  }

  return <Container {...{ style }}>{labelEl}</Container>
}

FieldLabel.propTypes = {
  isFocused: PT.bool,
  label: PT.oneOfType([PT.string, PT.bool]),
  style: ViewPropTypes.style,
}

FieldLabel.defaultProps = {
  isFocused: false,
  label: null,
  style: {},
}

export { FieldLabel }
