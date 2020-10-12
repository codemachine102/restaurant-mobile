import React from 'react'
import PT from 'prop-types'

import { Container, Label } from './styles'

const TabItem = ({ tab, isActive, isFluid }) => {
  return (
    <Container {...{ isActive, isFluid }}>
      <Label {...{ isActive }}>{tab.label}</Label>
    </Container>
  )
}

TabItem.propTypes = {
  isActive: PT.bool.isRequired,
  isFluid: PT.bool.isRequired,
  tab: PT.object.isRequired,
}

export { TabItem }
