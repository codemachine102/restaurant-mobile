import isFunction from 'lodash/isFunction'
import isNil from 'lodash/isNil'
import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'

const addDefaultOptionsToFn = ({ defaultOptions, fn }) => {
  return (dirtyOptions) => {
    const options = merge(
      {},
      isPlainObject(defaultOptions) && defaultOptions,
      isPlainObject(dirtyOptions) && dirtyOptions,
    )

    return fn(options)
  }
}

const addValidationToFn = ({ validator, fn, defaultValue }) => {
  return (value) => {
    const isValid = isFunction(validator) ? validator(value) : true

    if (!isValid) {
      return isNil(defaultValue) ? value : defaultValue
    }

    return fn(value)
  }
}

export default {
  addDefaultOptionsToFn,
  addValidationToFn,
}
