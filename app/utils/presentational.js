import transform from 'lodash/transform'

import ToolsUtils from './tools'

const getHitSlop = (offset) => {
  return {
    top: offset,
    right: offset,
    bottom: offset,
    left: offset,
  }
}

const getListWithSeparators = ToolsUtils.addDefaultOptionsToFn({
  defaultOptions: {
    insertBefore: false,
    insertAfter: false,
  },
  fn: ({ list, renderSeparator, insertBefore, insertAfter }) => {
    const makeSeparator = ({ item, index }, isBefore) => {
      return renderSeparator({
        item,
        index,
        id: [isBefore ? 'before' : 'after', index].join('-'),
      })
    }

    return transform(
      list,
      (acc, item, index) => {
        if (insertBefore) {
          acc.push(makeSeparator({ index, item }, true))
        }

        acc.push(item)

        if (index < list.length - 1 || insertAfter) {
          acc.push(makeSeparator({ index, item }))
        }
      },
      [],
    )
  },
})

export default {
  getHitSlop,
  getListWithSeparators,
}
