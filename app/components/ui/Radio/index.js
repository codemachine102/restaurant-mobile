import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import noop from 'lodash/noop'

import { Container, OuterCircle, InnerCircle, Label } from './styles'

const Radio = ({ value, label, onChange }) => {
  const [isPressed, setIsPressed] = useState(false)
  const isChecked = !!value

  const handlePressIn = useCallback(() => {
    setIsPressed(true)
  }, [setIsPressed])

  const handlePressOut = useCallback(() => {
    setIsPressed(false)
  }, [setIsPressed])

  const handlePress = useCallback(() => {
    if (!value) {
      onChange(true)
    }
  }, [value, onChange])

  return (
    <Container onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <OuterCircle>
        <InnerCircle {...{ isChecked, isPressed }} />
      </OuterCircle>

      <Label>{label}</Label>
    </Container>
  )
}

Radio.propTypes = {
  label: PT.string,
  value: PT.bool,
  onChange: PT.func,
}

Radio.defaultProps = {
  label: null,
  onChange: noop,
  value: false,
}

export { Radio }
