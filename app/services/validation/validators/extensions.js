import v from 'validate.js'
import { DateTime } from 'luxon'

import i18n from 'i18n'

v.extend(v.validators.datetime, {
  parse: (value) => {
    return DateTime.fromISO(value, { zone: 'utc' }).toMillis()
  },

  format: (value, options) => {
    return DateTime.fromMillis(value).toFormat(
      options.dateOnly ? 'MM/dd/yyyy' : 'MM/dd/yyyy hh:mm a',
    )
  },
})

v.extend(v.validators.presence, {
  message: () => {
    return i18n.t('form.validator.presence')
  },
})

v.extend(v.validators.email, {
  message: () => {
    return i18n.t('form.validator.email')
  },
})
