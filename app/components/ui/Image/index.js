import React from 'react'
import PT from 'prop-types'

import { Container } from './styles'

const Image = ({ innerRef, image, source, ...props }) => {
  const calcSource = () => {
    return source || { uri: image }
  }

  return <Container {...props} ref={innerRef} source={calcSource()} />
}

Image.propTypes = {
  image: PT.string,
  innerRef: PT.oneOfType([PT.string, PT.func]),
  source: PT.number,
}

Image.defaultProps = {
  image: null,
  innerRef: null,
  source: null,
}

export { Image }
