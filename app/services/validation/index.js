import v from 'validate.js'

import assign from 'lodash/assign'
import curry from 'lodash/curry'
import get from 'lodash/get'

import './validators'

const validate = curry((constraints, attributes, options = {}) => {
  const opts = assign(
    {},
    options.alias && {
      prettify: (attributeName) => {
        return get(options.alias, attributeName, v.prettify(attributeName))
      },
    },
  )

  return v(attributes, constraints, opts)
})

export default {
  validate,
}
