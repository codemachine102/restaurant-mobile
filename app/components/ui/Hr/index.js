import React from 'react'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Line, Dash } from './styles'

const Hr = ({ isDashed, color, thickness, style }) => {
  return isDashed ? (
    <Dash {...{ thickness, color, style }} />
  ) : (
    <Line {...{ thickness, color, style }} />
  )
}

Hr.propTypes = {
  color: PT.string,
  isDashed: PT.bool,
  style: ViewPropTypes.style,
  thickness: PT.number,
}

Hr.defaultProps = {
  color: 'santasGray',
  isDashed: false,
  style: {},
  thickness: 1,
}

export { Hr }
