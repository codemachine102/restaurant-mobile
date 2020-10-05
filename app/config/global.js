/* eslint no-underscore-dangle: 0, global-require: 0 */

import React from 'react'
import { LogBox, YellowBox } from 'react-native'

import PickingService from 'services/picking'

import DebugConfig from './debug'

const manageKeyboard = () => {
  PickingService.invokeForPlatform({
    platform: {
      ios: () => {
        const KeyboardManager = require('react-native-keyboard-manager').default

        KeyboardManager.setKeyboardDistanceFromTextField(5)
        KeyboardManager.setToolbarPreviousNextButtonEnable(true)
        KeyboardManager.setShouldShowToolbarPlaceholder(false)
      },
    },
  })
}

const ignoreLogBox = () => {
  if (!__DEV__) {
    return
  }

  // NOTE: If ReactNative's log box warnings are too much, it is possible to turn it off, but the
  //       healthier approach is to fix the warnings. =)
  if (DebugConfig.logBox) {
    if (LogBox) {
      LogBox.ignoreLogs(DebugConfig.logBoxIgnoreLogs)
    } else {
      YellowBox.ignoreWarnings(DebugConfig.logBoxIgnoreLogs)
    }
  } else if (LogBox) {
    LogBox.ignoreAllLogs()
  } else {
    console.disableYellowBox = true // eslint-disable-line no-console
  }
}

const trackRenders = () => {
  if (!__DEV__) {
    return
  }

  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  const ReactRedux = require('react-redux')
  const Apollo = require('@apollo/client')

  whyDidYouRender(React, {
    // trackAllPureComponents: true,
    trackExtraHooks: [
      [ReactRedux, 'useSelector'],
      [Apollo, 'useQuery'],
    ],
  })
}

const trackNetwork = () => {
  if (!__DEV__) {
    return
  }

  // NOTE: https://github.com/jhen0409/react-native-debugger/issues/432#issuecomment-638734367
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest
  global.FormData = global.originalFormData ? global.originalFormData : global.FormData
  fetch = require('unfetch')
  if (window.__FETCH_SUPPORT__) {
    window.__FETCH_SUPPORT__.blob = false
  } else {
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob
    global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader
  }
}

manageKeyboard()
ignoreLogBox()
trackRenders()
trackNetwork()
