import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import * as Routes from 'navigation/routes'

import { HomeScreen } from 'screens/Home'

const Stack = createStackNavigator()

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        cardShadowEnabled: false,
      }}
    >
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
    </Stack.Navigator>
  )
}

export { MainNavigator }
