import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import noop from 'lodash/noop'

import { Container, OuterCircle, InnerCircle, Caption } from './styles'

const Radio = ({ value, caption, onChange }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = useCallback(() => {
    setIsPressed(true)
  }, [setIsPressed])

  const handlePressOut = useCallback(() => {
    setIsPressed(false)
  }, [setIsPressed])

  const isChecked = !!value

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

      <Caption>{caption}</Caption>
    </Container>
  )
}

Radio.propTypes = {
  caption: PT.string,
  value: PT.bool,
  onChange: PT.func,
}

Radio.defaultProps = {
  caption: null,
  onChange: noop,
  value: false,
}

export { Radio }
