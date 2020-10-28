import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import { StyledPropTypes } from 'constants/propTypes'

import { Container, Title, InnerFlat, InnerGradient, ProgressIndicator } from './styles'

const Button = ({ title, variant, isDisabled, isOutlined, isProgress, onPress, ...props }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = useCallback(() => {
    setIsPressed(true)
  }, [setIsPressed])

  const handlePressOut = useCallback(() => {
    setIsPressed(false)
  }, [setIsPressed])

  const renderInner = () => {
    const content = isProgress ? (
      <ProgressIndicator {...{ variant }} />
    ) : (
      <Title {...{ variant, isDisabled, isOutlined, isPressed }}>{title}</Title>
    )

    if (isPressed || isDisabled || isOutlined) {
      return (
        <InnerFlat {...props} {...{ variant, isDisabled, isOutlined, isPressed }}>
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
      {...{ onPress }}
      isDisabled={isDisabled || isProgress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {renderInner()}
    </Container>
  )
}

Button.propTypes = {
  isDisabled: PT.bool,
  isOutlined: PT.bool,
  isProgress: PT.bool,
  title: PT.string.isRequired,
  variant: StyledPropTypes.variant,
  onPress: PT.func,
}

Button.defaultProps = {
  isDisabled: false,
  isOutlined: false,
  isProgress: false,
  onPress: null,
  variant: 'primary',
}

export { Button }
