import React, { useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components/native'

import get from 'lodash/get'

import { AppProvider } from 'services/app'
import NavigationService from 'services/navigation'

import GET_ME from 'graphql/queries/me.graphql'

import { selectIsAuthenticated } from 'store/slices/session'
import { selectTheme } from 'store/slices/theme'

import { RootNavigator } from 'navigation/navigators/root'

import { ProgressScreen } from 'screens/Progress'

const StatefulNavigation = () => {
  const theme = useSelector(selectTheme)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const meQuery = useQuery(GET_ME, {
    skip: !isAuthenticated,
  })

  const viewer = get(meQuery, 'data.me', null)

  const handleNavigationReady = useCallback(() => {
    NavigationService.isReadyRef.current = true
  }, [])

  return (
    <ThemeProvider {...{ theme }}>
      <AppProvider {...{ viewer }}>
        <NavigationContainer ref={NavigationService.navigationRef} onReady={handleNavigationReady}>
          {meQuery.loading ? <ProgressScreen /> : <RootNavigator />}
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>
  )
}

export { StatefulNavigation }
