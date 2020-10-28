import React, { useCallback } from 'react'
import PT from 'prop-types'

import { Container, Radio } from './styles'

const OptionItem = ({ option, isChecked, isFluid, onChange }) => {
  const handleChange = useCallback(() => {
    if (!isChecked) {
      onChange(option.value)
    }
  }, [option, isChecked, onChange])

  return (
    <Container {...{ isFluid }}>
      <Radio value={isChecked} label={option.label} onChange={handleChange} />
    </Container>
  )
}

OptionItem.propTypes = {
  isChecked: PT.bool.isRequired,
  isFluid: PT.bool.isRequired,
  option: PT.object.isRequired,
  onChange: PT.func.isRequired,
}

export { OptionItem }
