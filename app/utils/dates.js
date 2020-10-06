import { DateTime } from 'luxon'
import ms from 'ms'

const formatRelativeTime = (timestamp) => {
  const aDT = DateTime.fromISO(timestamp)
  const bDT = DateTime.local()
  const diff = bDT.diff(aDT).as('milliseconds')

  if (diff < ms('1m')) {
    return 'Now'
  }

  if (diff < ms('1d')) {
    return aDT.toFormat('hh:mm a')
  }

  if (aDT.hasSame(bDT, 'year')) {
    return aDT.toFormat('MMM. dd')
  }

  return aDT.toFormat('MM/dd/yyyy')
}

export default {
  formatRelativeTime,
}
