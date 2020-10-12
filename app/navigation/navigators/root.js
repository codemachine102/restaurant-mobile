import React from 'react'
import { StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import { selectIsAuthenticated } from 'store/slices/session'

import * as Routes from 'navigation/routes'

import { AuthNavigator } from './auth'
import { MainNavigator } from './main'

const Stack = createStackNavigator()

const RootNavigator = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        header: () => {
          return <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        },
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name={Routes.Main} component={MainNavigator} />
      ) : (
        <Stack.Screen
          name={Routes.Auth}
          component={AuthNavigator}
          options={{ animationEnabled: false }}
        />
      )}
    </Stack.Navigator>
  )
}

export { RootNavigator }
