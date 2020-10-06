import map from 'lodash/map'

import ToolsUtils from './tools'

const getFieldError = (meta) => {
  return meta.error && (meta.modified || meta.submitFailed) ? meta.error : null
}

const createOption = ToolsUtils.addDefaultOptionsToFn({
  defaultOptions: {
    getValue: (o) => {
      return o.id || o.value || o
    },
    getLabel: (o) => {
      return o.name || o.label || o
    },
  },
  fn: ({ getValue, getLabel, getExtendedLabel }) => {
    return (data, index) => {
      return {
        value: getValue(data, index),
        label: getLabel(data, index),
        extendedLabel: (getExtendedLabel || getLabel)(data, index),
      }
    }
  },
})

const createOptions = ({ list, ...options }) => {
  return map(list, createOption(options))
}

export default {
  getFieldError,
  createOptions,
}
