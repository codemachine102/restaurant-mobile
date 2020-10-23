import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import { StyledPropTypes } from 'constants/propTypes'

import { Container, InnerFlat, InnerGradient, Icon } from './styles'

const IconButton = ({ iconProps, variant, isDisabled, isSmall, onPress, ...props }) => {
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
        <InnerFlat {...props} {...{ variant, isDisabled, isPressed, isSmall }}>
          <Icon {...iconProps} {...{ isDisabled }} />
        </InnerFlat>
      )
    }

    return (
      <InnerGradient {...props} {...{ variant, isDisabled, isPressed, isSmall }}>
        <Icon {...iconProps} {...{ isDisabled }} />
      </InnerGradient>
    )
  }

  return (
    <Container
      {...{ isDisabled }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {renderInner()}
    </Container>
  )
}

IconButton.propTypes = {
  iconProps: PT.object,
  isDisabled: PT.bool,
  isSmall: PT.bool,
  variant: StyledPropTypes.variant,
  onPress: PT.func,
}

IconButton.defaultProps = {
  iconProps: {},
  isDisabled: false,
  isSmall: false,
  onPress: null,
  variant: 'primary',
}

export { IconButton }
