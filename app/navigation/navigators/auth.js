import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import * as Routes from 'navigation/routes'

import { ForgotPasswordScreen } from 'screens/ForgotPassword'
import { SignInScreen } from 'screens/SignIn'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SignIn}
      headerMode="none"
      screenOptions={{
        cardShadowEnabled: false,
      }}
    >
      <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

export { AuthNavigator }
