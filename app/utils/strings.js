import compact from 'lodash/compact'
import join from 'lodash/join'
import map from 'lodash/map'
import split from 'lodash/split'
import stringReplace from 'react-string-replace'
import trim from 'lodash/trim'

const makeAcronym = (str) => {
  return join(
    map(compact(split(str, ' ')), (item) => {
      return item[0].toUpperCase()
    }),
    '',
  )
}

const stringToColor = (str) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }

  return color
}

const singleSpaces = (str) => {
  return str.replace(/  +/g, ' ')
}

const sanitize = (str) => {
  return trim(singleSpaces(str))
}

const replaceWithComponent = (str, replacer, matcher = /\$\[(.+)\]/g) => {
  return stringReplace(str, matcher, replacer)
}

export default {
  makeAcronym,
  replaceWithComponent,
  sanitize,
  singleSpaces,
  stringToColor,
}
