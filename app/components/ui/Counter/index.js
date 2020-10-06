import React from 'react'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Container, Count } from './styles'

const Counter = ({ count, cap, style }) => {
  return (
    <Container {...{ style }}>
      {count > 0 && <Count>{cap >= count ? count : `${cap}+`}</Count>}
    </Container>
  )
}

Counter.propTypes = {
  cap: PT.number,
  count: PT.number,
  style: ViewPropTypes.style,
}

Counter.defaultProps = {
  cap: 99,
  count: 0,
  style: {},
}

export { Counter }
