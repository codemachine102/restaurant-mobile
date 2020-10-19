import React, { useCallback } from 'react'
import PT from 'prop-types'

import ms from 'ms'

import i18n from 'i18n'

import { useCountdown } from 'hooks'

import { ResendText, CountdownText } from './styles'

const Resend = ({ onResendCode }) => {
  const [countdownDur, isFinished, startCountdown] = useCountdown(ms('1m'))

  const handleResend = useCallback(() => {
    startCountdown()
    onResendCode()
  }, [startCountdown, onResendCode])

  return isFinished ? (
    <ResendText onPress={handleResend}>{i18n.t('screen.common.auth.phrase.resend')}</ResendText>
  ) : (
    <CountdownText onPress={handleResend}>{countdownDur.toFormat('mm:ss')}</CountdownText>
  )
}

Resend.propTypes = {
  onResendCode: PT.func.isRequired,
}

export { Resend }
