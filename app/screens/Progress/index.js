import React from 'react'

import { Container, Preloader, StatusBar } from './styles'

const ProgressScreen = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Preloader />
    </Container>
  )
}

export { ProgressScreen }
