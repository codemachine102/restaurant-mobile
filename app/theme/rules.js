import { system, compose, fontFamily } from 'styled-system'

import get from 'lodash/get'
import join from 'lodash/join'

import { getShadow, getTypography, mapProps, getPx } from './helpers'

export const tintColor = system({
  tintColor: {
    property: 'tintColor',
    scale: 'colors',
  },
})

export const shadowColor = system({
  shadowColor: {
    property: 'shadowColor',
    scale: 'colors',
  },
})

export const shadowRadius = system({
  shadowRadius: {
    property: 'shadowRadius',
    scale: 'radii',
  },
})

export const shadowOffset = system({
  shadowOffset: true,
})

export const shadowOpacity = system({
  shadowOpacity: true,
})

export const elevation = system({
  elevation: true,
})

export const lineHeight = system({
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights',
    transform: getPx,
  },
})

export const shadowComposite = mapProps((props) => {
  const shadowProps = getShadow(props.shadow)(props)

  return {
    ...shadowProps,
    ...props,
  }
})(compose(shadowColor, shadowOffset, shadowRadius, shadowOpacity, elevation))

export const fontFamilyComposite = mapProps((props) => {
  const fGroup = getTypography(props.fontFamilyGroup)(props)
  const fStyle = getTypography(props.fontFamilyStyle)(props)
  const fSeparator = getTypography(`separator.${fGroup}`)(props)

  if (!fGroup || !fStyle) {
    return props
  }

  return {
    fontFamily: join([fGroup, fStyle], fSeparator),
    ...props,
  }
})(fontFamily)

export const lineHeightComposite = mapProps((props) => {
  return {
    lineHeight: props.lineHeight || props.fontSize,
    ...props,
  }
})(lineHeight)
