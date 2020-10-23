import { Platform } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

import Secrets from 'react-native-config'

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

const getAppType = () => {
  return Secrets.IS_CUSTOMER === 'true' ? 'customer' : 'venue'
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

const forPlatform = (options, fallback) => {
  const OSKey = getPlatformOS()
  const groupKey = getPlatformGroup()
  const defaultKey = 'default'

  return find([options[OSKey], options[groupKey], options[defaultKey], fallback], negate(isNil))
}

const forAppType = (options, fallback) => {
  return find([options[getAppType()], options.default, fallback], negate(isNil))
}

const invokeForPlatform = invokeLazily(forPlatform)
const invokeForAppType = invokeLazily(forAppType)

export default {
  getPlatformGroup,
  getPlatformOS,
  getPlatformVersion,
  forPlatform,
  invokeForPlatform,
  invokeForAppType,
}
