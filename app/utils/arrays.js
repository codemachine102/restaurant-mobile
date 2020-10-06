import castArray from 'lodash/castArray'
import difference from 'lodash/difference'
import union from 'lodash/union'

function toggleItem(items, item, isPresent) {
  return isPresent ? union(items, castArray(item)) : difference(items, castArray(item))
}

export default {
  toggleItem,
}
