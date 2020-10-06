import { themeGet } from '@styled-system/theme-get'
import { mapToTheme as theme } from 'styled-map'

import get from 'lodash/get'
import isNumber from 'lodash/isNumber'

const px = (n) => {
  return isNumber(n) && n !== 0 ? `${n}px` : n
}

export const getPx = (n, scale) => {
  return px(get(scale, n))
}

export const mapProps = (mapper) => {
  return (func) => {
    return (props) => {
      return func(mapper(props))
    }
  }
}

export const mapToTheme = (key, prop = 'variant') => {
  return theme(key, prop)
}

export const getColor = (key) => {
  return themeGet(`colors.${key}`)
}

export const getMetrics = (key) => {
  return themeGet(`metrics.${key}`)
}

export const getShadow = (key) => {
  return themeGet(`shadows.${key}`)
}

export const getSpace = (key) => {
  return themeGet(`space.${key}`)
}

export const getRadii = (key) => {
  return themeGet(`radii.${key}`)
}

export const getTypography = (key) => {
  return themeGet(`typography.${key}`)
}

export const getFontSize = (key) => {
  return themeGet(`fontSizes.${key}`)
}

export const getLineHeight = (key) => {
  return themeGet(`lineHeights.${key}`)
}
