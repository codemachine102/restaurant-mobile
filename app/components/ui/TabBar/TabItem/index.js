import React, { useCallback } from 'react'
import PT from 'prop-types'

import { Container, Label } from './styles'

const TabItem = ({ tab, isActive, isFluid, onChange }) => {
  const handlePress = useCallback(() => {
    if (!isActive) {
      onChange(tab.id)
    }
  }, [tab, isActive, onChange])

  return (
    <Container {...{ isActive, isFluid }} onPress={handlePress}>
      <Label {...{ isActive }}>{tab.label}</Label>
    </Container>
  )
}

TabItem.propTypes = {
  isActive: PT.bool.isRequired,
  isFluid: PT.bool.isRequired,
  tab: PT.object.isRequired,
  onChange: PT.func.isRequired,
}

export { TabItem }
