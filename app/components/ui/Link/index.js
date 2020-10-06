import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import LinkingService from 'services/linking'

import { ViewPropTypes, StyledPropTypes } from 'constants/propTypes'

import { Container, Message } from './styles'

const Link = ({ variant, url, messageProps, children, onPress }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = useCallback(() => {
    setIsPressed(true)
  }, [setIsPressed])

  const handlePressOut = useCallback(() => {
    setIsPressed(false)
  }, [setIsPressed])

  const handlePress = useCallback(() => {
    if (onPress) {
      return onPress()
    }

    if (url) {
      return LinkingService.navigateToUrl({ url })
    }

    return null
  }, [url, onPress])

  return (
    <Container onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Message {...messageProps} {...{ variant, isPressed }}>
        {children}
      </Message>
    </Container>
  )
}

Link.propTypes = {
  children: PT.node.isRequired,
  messageProps: PT.object,
  style: ViewPropTypes.style,
  url: PT.string,
  variant: StyledPropTypes.variant,
  onPress: PT.func,
}

Link.defaultProps = {
  messageProps: {},
  onPress: null,
  style: {},
  url: null,
  variant: 'primary',
}

export { Link }
