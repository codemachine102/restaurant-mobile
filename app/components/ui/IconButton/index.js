import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import { StyledPropTypes } from 'constants/propTypes'

import { Container, InnerFlat, InnerGradient, Icon } from './styles'

const IconButton = ({ iconProps, variant, isDisabled, onPress, small, ...props }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = useCallback(() => {
    setIsPressed(true)
  }, [setIsPressed])

  const handlePressOut = useCallback(() => {
    setIsPressed(false)
  }, [setIsPressed])

  const handlePress = useCallback(() => {
    if (onPress) onPress()
  }, [onPress])

  const renderInner = () => {
    if (isPressed || isDisabled) {
      return (
        <InnerFlat {...props} {...{ variant, isDisabled, isPressed, small }}>
          <Icon {...{ iconProps, isDisabled }} />
        </InnerFlat>
      )
    }

    return (
      <InnerGradient {...props} {...{ variant, isDisabled, isPressed, small }}>
        <Icon {...{ iconProps, isDisabled }} />
      </InnerGradient>
    )
  }

  return (
    <Container
      isDisabled={isDisabled}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {renderInner()}
    </Container>
  )
}

IconButton.propTypes = {
  iconProps: PT.shape({ glyph: PT.string.isRequired, h: PT.number, w: PT.number }).isRequired,
  isDisabled: PT.bool,
  small: PT.bool,
  variant: StyledPropTypes.variant,
  onPress: PT.func,
}

IconButton.defaultProps = {
  isDisabled: false,
  onPress: null,
  small: false,
  variant: 'primary',
}

export { IconButton }
