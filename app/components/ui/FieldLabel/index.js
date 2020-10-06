import React from 'react'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Container, Label } from './styles'

const FieldLabel = ({ label, style }) => {
  const labelEl = label ? <Label>{label === true ? ' ' : label}</Label> : null

  if (!labelEl) {
    return null
  }

  return <Container {...{ style }}>{labelEl}</Container>
}

FieldLabel.propTypes = {
  label: PT.oneOfType([PT.string, PT.bool]),
  style: ViewPropTypes.style,
}

FieldLabel.defaultProps = {
  label: null,
  style: {},
}

export { FieldLabel }
