import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import * as Routes from 'navigation/routes'

import { SimpleHeader } from 'components/headers'

import { SignInScreen } from 'screens/SignIn'
import { ForgotPasswordScreen } from 'screens/ForgotPassword'
import { SignUpScreen } from 'screens/SignUp'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SignIn}
      screenOptions={{
        cardShadowEnabled: false,

        header: (props) => {
          return <SimpleHeader {...props} />
        },
      }}
    >
      <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

export { AuthNavigator }
