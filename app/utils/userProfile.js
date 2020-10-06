import get from 'lodash/get'

import StringsUtils from './strings'

const formatFullName = (profile, fallback = 'Incognito') => {
  const fName = get(profile, 'firstName', '')
  const lName = get(profile, 'lastName', '')
  const email = get(profile, 'email', '')

  if (fName && lName) {
    return StringsUtils.sanitize(`${fName} ${lName}`)
  }

  return email || fallback
}

export default {
  formatFullName,
}
