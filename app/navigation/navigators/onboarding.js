import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PickingService from 'services/picking'

import * as Routes from 'navigation/routes'

import { SimpleHeader } from 'components/headers'

const Stack = createStackNavigator()

const OnboardingNavigator = () => {
  const screens = PickingService.invokeForAppType({
    customer: () => {
      const { SetupCustomerScreen } = require('screens/SetupCustomerScreen')

      return <Stack.Screen name={Routes.SetupCustomer} component={SetupCustomerScreen} />
    },
    venue: () => {
      const { SetupVenueScreen } = require('screens/SetupVenueScreen')

      return <Stack.Screen name={Routes.SetupVenue} component={SetupVenueScreen} />
    },
  })

  return (
    <Stack.Navigator
      initialRouteName={Routes.SetupCustomer}
      screenOptions={{
        cardShadowEnabled: false,

        header: (props) => {
          return <SimpleHeader {...props} />
        },
      }}
    >
      {screens}
    </Stack.Navigator>
  )
}

export { OnboardingNavigator }
