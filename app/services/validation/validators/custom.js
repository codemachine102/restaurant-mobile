/* eslint no-param-reassign: 0, consistent-return: 0 */

import v from 'validate.js'
import constant from 'lodash/constant'
import get from 'lodash/get'

import i18n from 'i18n'

v.extend(v.validators, {
  matching: function matching(value, options, attribute, attributes, globalOptions) {
    if (!v.isDefined(value)) {
      return
    }

    if (v.isFunction(options)) {
      options = { predicateFn: options }
    }

    options = v.extend({}, this.options, options)

    const message = options.message || this.message || i18n.t('form.validator.matching')
    const predicateFn = options.predicateFn || constant(true)
    const prettify = options.prettify || get(globalOptions, 'prettify') || v.prettify

    if (!predicateFn(value, options, attribute, attributes)) {
      return v.format(message, {
        attribute: prettify(attribute),
        value,
      })
    }
  },
})
