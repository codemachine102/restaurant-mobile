import React from 'react'
import { StatusBar } from 'react-native'
// import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

// import { selectIsAuthenticated } from 'store/slices/session'

import * as Routes from 'navigation/routes'

import { AuthNavigator } from './auth'

const Stack = createStackNavigator()

const RootNavigator = () => {
  // const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        header: () => {
          return <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        },
      }}
    >
      <Stack.Screen
        name={Routes.Auth}
        component={AuthNavigator}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  )
}

export { RootNavigator }
