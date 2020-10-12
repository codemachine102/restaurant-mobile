/* eslint prefer-destructuring: 0 */

import styled from 'styled-components/native'
import { RecyclerListView } from 'recyclerlistview'

import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import mapValues from 'lodash/mapValues'
import merge from 'lodash/merge'

import PickingService from 'services/picking'

import { getMetrics, getSpace } from 'theme'

import { Box } from 'components/ui'

const isIOS13Plus = PickingService.invokeForPlatform({
  ios: () => {
    return PickingService.getPlatformVersion() >= 13
  },
  android: () => {
    return false
  },
})

export const Container = styled(Box).attrs(() => {
  return {
    bg: 'night100',
  }
})`
  flex: 1;
`

const getPadding = ({ props, value, fallback }) => {
  if (isNil(value) && isNil(fallback)) {
    return null
  }

  const p = isNil(value) ? fallback : value
  let pt
  let pr
  let pb
  let pl

  if (isNumber(p)) {
    pt = p
    pr = p
    pb = p
    pl = p
  } else {
    switch (p.length) {
      case 1:
        pt = p[0]
        pr = p[0]
        pb = p[0]
        pl = p[0]
        break
      case 2:
        pt = p[0]
        pr = p[1]
        pb = p[0]
        pl = p[1]
        break
      case 3:
        pt = p[0]
        pr = p[1]
        pb = p[2]
        pl = p[1]
        break
      case 4:
        pt = p[0]
        pr = p[1]
        pb = p[2]
        pl = p[3]
        break
      default:
    }
  }

  return mapValues({ pt, pr, pb, pl }, (v) => {
    const themeValue = getSpace(v)(props)
    const normalizedValue = isNumber(themeValue) ? themeValue : v

    return normalizedValue
  })
}

const interpolatePadding = (padding) => {
  return {
    paddingTop: padding.pt,
    paddingRight: padding.pr,
    paddingBottom: padding.pb,
    paddingLeft: padding.pl,
  }
}

export const Scrollable = styled.ScrollView.attrs((props) => {
  const bSpace = getMetrics('bottomSpace')(props)
  const tSpace = PickingService.invokeForPlatform({
    ios: () => {
      return getMetrics('statusBarUnsafeHeight')(props)
    },
    android: () => {
      return 0
    },
  })

  const iPadding = getPadding({ props, value: props.iSpace, fallback: 6 })

  return merge(
    {
      keyboardShouldPersistTaps: 'handled',
      keyboardDismissMode: 'interactive',

      contentContainerStyle: {
        flexGrow: 1,
        ...interpolatePadding(iPadding),
      },
    },
    // NOTE: Here we mimic "contentInsetAdjustmentBehavior: 'automatic'"
    //       behaviour and still stay no headache
    props.fromTop && {
      scrollIndicatorInsets: {
        top: tSpace,
      },
      contentContainerStyle: {
        paddingTop: tSpace + iPadding.pt,
      },
    },
    props.toBottom && {
      scrollIndicatorInsets: {
        bottom: isIOS13Plus ? 0.01 : bSpace,
      },
      contentContainerStyle: {
        paddingBottom: bSpace + iPadding.pb,
      },
    },
    props.contentAlignment && {
      contentContainerStyle: {
        justifyContent: props.contentAlignment,
      },
    },
  )
})`
  flex: 1;
`

export const List = styled.FlatList.attrs((props) => {
  const bSpace = getMetrics('bottomSpace')(props)
  const tSpace = PickingService.forPlatform({
    platform: {
      ios: getMetrics('statusBarUnsafeHeight')(props),
      android: 0,
    },
  })

  const iPadding = getPadding({ props, value: props.iSpace, fallback: 6 })
  const hPadding = getPadding({ props, value: props.hSpace })
  const fPadding = getPadding({ props, value: props.fSpace })

  return merge(
    {
      keyboardShouldPersistTaps: 'handled',
      keyboardDismissMode: 'interactive',

      contentContainerStyle: {
        flexGrow: 1,
      },
    },

    iPadding && {
      contentContainerStyle: {
        ...interpolatePadding(iPadding),
      },
    },

    hPadding && {
      ListHeaderComponentStyle: {
        ...interpolatePadding(hPadding),
      },
    },

    fPadding && {
      ListFooterComponentStyle: {
        ...interpolatePadding(fPadding),
      },
    },

    // NOTE: Here we mimic "contentInsetAdjustmentBehavior: 'automatic'"
    //       behaviour and still stay no headache
    props.fromTop && {
      scrollIndicatorInsets: {
        top: tSpace,
      },

      contentContainerStyle: {
        paddingTop: tSpace + iPadding.pt,
      },
    },

    props.toBottom && {
      scrollIndicatorInsets: {
        bottom: isIOS13Plus ? 0.01 : bSpace,
      },

      contentContainerStyle: {
        paddingBottom: bSpace + iPadding.pb,
      },
    },
  )
})`
  flex: 1;
`

export const RecyclerList = List.withComponent(RecyclerListView)
