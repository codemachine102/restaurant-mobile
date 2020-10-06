import isString from 'lodash/isString'

import StringsUtils from './strings'
import ToolsUtils from './tools'

const integer = ToolsUtils.addValidationToFn({
  fn: StringsUtils.integer,
  validator: isString,
  defaultValue: '',
})

const sanitize = ToolsUtils.addValidationToFn({
  fn: StringsUtils.sanitize,
  validator: isString,
  defaultValue: '',
})

const toLower = ToolsUtils.addValidationToFn({
  fn: StringsUtils.toLower,
  validator: isString,
  defaultValue: '',
})

export default {
  integer,
  sanitize,
  toLower,
}
