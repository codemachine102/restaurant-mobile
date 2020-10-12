import React from 'react'

import { Container, Preloader, StatusBar } from './styles'

const ProgressScreen = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Preloader />
    </Container>
  )
}

export { ProgressScreen }
