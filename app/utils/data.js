import castArray from 'lodash/castArray'
import difference from 'lodash/difference'
import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import union from 'lodash/union'

const pickExisting = ({ subject }) => {
  return pickBy(subject, identity)
}

const toggleListItem = ({ list, listItem, isActive }) => {
  return isActive ? union(list, castArray(listItem)) : difference(list, castArray(listItem))
}

const percentageOfNumberToNumber = ({ numberA, numberB }) => {
  return (numberA / numberB) * 100
}

const percentageOfNumber = (number, percentage) => {
  return (percentage / 100) * number
}

export default {
  percentageOfNumberToNumber,
  percentageOfNumber,
  pickExisting,
  toggleListItem,
}
