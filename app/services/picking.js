import { Platform } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

import find from 'lodash/find'
import isNil from 'lodash/isNil'
import negate from 'lodash/negate'

const getPlatformOS = () => {
  return Platform.OS
}

const getPlatformVersion = () => {
  return parseInt(Platform.Version, 10)
}

const getPlatformGroup = () => {
  return isIphoneX() ? 'iPhoneX' : 'notIphoneX'
}

const invokeLazily = (fn) => {
  return (...args) => {
    const actionToInvoke = fn(...args)

    if (!actionToInvoke) {
      return null
    }

    return actionToInvoke()
  }
}

const forPlatform = (platform, fallback) => {
  const OSKey = getPlatformOS()
  const groupKey = getPlatformGroup()
  const defaultKey = 'default'

  return find([platform[OSKey], platform[groupKey], platform[defaultKey], fallback], negate(isNil))
}

const invokeForPlatform = invokeLazily(forPlatform)

export default {
  getPlatformGroup,
  getPlatformOS,
  getPlatformVersion,
  forPlatform,
  invokeForPlatform,
}
