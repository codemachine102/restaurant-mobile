import { useState, useCallback, useEffect } from 'react'
import { DateTime, Duration } from 'luxon'

import ms from 'ms'

const useCountdown = (millis) => {
  const [startDT, setStartDT] = useState(null)
  const [isFinished, setIsFinished] = useState(true)
  const [countdownDur, setCountdownDur] = useState(null)

  const start = useCallback(() => {
    setStartDT(DateTime.utc().set({ milliseconds: 0 }))
    setCountdownDur(Duration.fromObject({ milliseconds: millis }))
  }, [millis])

  useEffect(() => {
    let interval

    const tickFn = () => {
      const nowDT = DateTime.utc().set({ milliseconds: 0 })
      const delta = nowDT.diff(startDT).as('milliseconds')
      const nextCountdownDur = Duration.fromObject({ milliseconds: millis - delta })
      const nextIsFinished = nextCountdownDur.as('milliseconds') <= 0

      if (nextIsFinished !== isFinished) {
        setIsFinished(nextIsFinished)

        if (nextIsFinished) {
          setStartDT(null)
          setCountdownDur(null)
        }
      } else {
        setCountdownDur(nextCountdownDur)
      }
    }

    if (startDT) {
      interval = setInterval(tickFn, ms('1s'))
      tickFn()
    }

    return () => {
      clearInterval(interval)
    }
  }, [startDT, millis, isFinished])

  return [countdownDur, isFinished, start]
}

export { useCountdown }
