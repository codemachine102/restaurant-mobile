import { useState, useCallback, useRef, useEffect } from 'react'
import { DateTime } from 'luxon'
import styled from 'styled-components/native'

import { logoImage } from 'assets/images'

import { Box, Text, Image } from 'components/ui'

export { Form } from 'react-final-form'
export { Container, Scrollable } from 'components/common'
export { FormField, FormTextInput } from 'components/blocks'
export { Button, TabBar } from 'components/ui'

export const TAB_HASH = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
}

export function useTimer(seconds) {
  const [isActive, setActive] = useState(false)
  const endRef = useRef()
  const [countdown, setCountDown] = useState(seconds)
  const hasEnded = countdown === 0

  const start = useCallback(() => {
    endRef.current = DateTime.utc().plus(seconds * 1000)
    setCountDown(seconds)
    setActive(true)
  }, [seconds])

  useEffect(() => {
    let interval
    if (isActive) {
      interval = setInterval(() => {
        const nowDT = DateTime.utc().set({ milliseconds: 0 })
        const sinceMountTime = -nowDT.diff(endRef.current).as('seconds')
        const isDelayed = sinceMountTime <= 0

        if (isDelayed) {
          clearInterval(interval)
          setCountDown(0)
          setActive(false)
        } else {
          setCountDown(sinceMountTime)
        }
      }, 1000)
    }

    return () => {
      return clearInterval(interval)
    }
  }, [isActive, seconds])

  return [countdown, hasEnded, start]
}

export const Top = styled(Box).attrs(() => {
  return {
    py: 4,
  }
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Middle = styled.View`
  flex-grow: 1;
  padding-top: 15%;
  padding-bottom: 10%;
`

export const Bottom = styled.View`
  justify-content: flex-end;
`

export const Inner = styled.View``

export const Content = styled.View``

export const Footer = styled(Box).attrs(() => {
  return {
    mt: 7,
    px: 11,
  }
})``

export const LogoContainer = styled(Box).attrs(() => {
  return {
    size: 56,
    borderRadius: 3,
    borderColor: 'night50',
  }
})`
  border-width: 1px;
  align-items: center;
  justify-content: center;
`

export const Logo = styled(Image).attrs(() => {
  return {
    source: logoImage,
  }
})`
  width: 40px;
  height: 29px;
`

export const Title = styled(Text).attrs(() => {
  return {
    mb: 4,
    fontSize: 3,
    fontFamilyGroup: 'group.bfast',
    color: 'persimmon100',
  }
})``

export const Motto = styled(Text).attrs(() => {
  return {
    mb: 4,
    fontSize: 2,
    fontFamilyGroup: 'group.bfast',
  }
})``

export const Usage = styled(Text)`
  width: 70%;
`

export const TimerText = styled(Text).attrs(() => {
  return {
    color: 'persimmon100',
  }
})``

export const ResendText = styled(Text).attrs(() => {
  return {
    color: 'persimmon100',
  }
})``
