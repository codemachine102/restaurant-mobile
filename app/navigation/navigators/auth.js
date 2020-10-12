import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import * as Routes from 'navigation/routes'

import { SimpleHeader } from 'components/headers'

// import { ForgotPasswordScreen} from 'screens/ForgotPassword'
import { SignInScreen } from 'screens/SignIn'
import { SignUpScreen } from 'screens/SignUp'
import { ResetPasswordScreen } from '../../screens/ResetPassword'

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
      <Stack.Screen name={Routes.ForgotPassword} component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

export { AuthNavigator }
