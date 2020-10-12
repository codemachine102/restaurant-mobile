import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import { StyledPropTypes } from 'constants/propTypes'

import { Container, Title, InnerFlat, InnerGradient, ProgressIndicator } from './styles'

const Button = ({ title, variant, isDisabled, isProgress, onPress, ...props }) => {
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
    const content = isProgress ? (
      <ProgressIndicator {...{ variant }} />
    ) : (
      <Title {...{ variant, isDisabled, isPressed }}>{title}</Title>
    )

    if (isPressed || isDisabled) {
      return (
        <InnerFlat {...props} {...{ variant, isDisabled, isPressed }}>
          {content}
        </InnerFlat>
      )
    }

    return (
      <InnerGradient {...props} {...{ variant, isDisabled, isPressed }}>
        {content}
      </InnerGradient>
    )
  }

  return (
    <Container
      isDisabled={isDisabled || isProgress}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {renderInner()}
    </Container>
  )
}

Button.propTypes = {
  isDisabled: PT.bool,
  isProgress: PT.bool,
  title: PT.string.isRequired,
  variant: StyledPropTypes.variant,
  onPress: PT.func,
}

Button.defaultProps = {
  isDisabled: false,
  isProgress: false,
  onPress: null,
  variant: 'primary',
}

export { Button }
