import React, { useMemo, useCallback } from 'react'

import get from 'lodash/get'

import i18n from 'i18n'

// import { requestResetPassword } from 'services/api/queries/auth'
import ValidationService from 'services/validation'

import AppConfig from 'config/app'

import { ReactNavigationPropTypes } from 'constants/propTypes'
import * as Routes from 'navigation/routes'

import {
  Container,
  Scrollable,
  Top,
  Bottom,
  Form,
  Field,
  Inner,
  Content,
  Footer,
  FormTextInput,
  Button,
  LinkButton,
  Instruction,
} from './styles'

const ForgotPasswordScreen = ({ navigation, route }) => {
  const initialValues = useMemo(() => {
    return {
      email: get(route.params, 'email') || AppConfig.credentials.email || '',
      withRefresh: true,
    }
  }, [route])

  const validate = (values) => {
    const constraints = {
      email: {
        presence: true,
        email: true,
      },
    }

    return ValidationService.validate(constraints, values, {
      alias: {
        email: i18n.t('screen.resetPassword.form.label.email'),
        password: i18n.t('screen.resetPassword.form.label.password'),
      },
    })
  }

  const onSubmit = useCallback(async () => {
    // const response = await requestResetPassword(values)

    // if (response.ok === false) {
    //   return
    // }

    navigation.navigate(Routes.SignIn)
  }, [navigation])

  const handleBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const renderForm = useCallback(
    ({ submitting, handleSubmit }) => {
      return (
        <Inner>
          <Instruction>{i18n.t('screen.resetPassword.phrase.instruction')}</Instruction>

          <Content>
            <Field
              name="email"
              component={FormTextInput}
              keyboardType="email-address"
              label={i18n.t('screen.resetPassword.form.label.email')}
              placeholder={i18n.t('screen.resetPassword.form.placeholder.email')}
              autoCapitalize="none"
            />

            <Field
              name="email"
              component={FormTextInput}
              keyboardType="email-address"
              label={i18n.t('screen.resetPassword.form.label.email')}
              placeholder={i18n.t('screen.resetPassword.form.placeholder.email')}
              autoCapitalize="none"
              mt={5}
              opacity={0}
              isErrorMessageHidden
            />
          </Content>

          <Footer>
            <Button
              title={i18n.t('screen.resetPassword.button.send')}
              mb={4}
              isProgress={submitting}
              isLast
              onPress={handleSubmit}
            />

            <LinkButton onPress={handleBackPress}>
              {i18n.t('screen.resetPassword.button.back')}
            </LinkButton>
          </Footer>
        </Inner>
      )
    },
    [handleBackPress],
  )

  return (
    <Container>
      <Scrollable fromTop toBottom>
        <Top />

        <Bottom>
          <Form {...{ validate, initialValues, onSubmit }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

ForgotPasswordScreen.propTypes = {
  navigation: ReactNavigationPropTypes.navigation.isRequired,
  route: ReactNavigationPropTypes.route.isRequired,
}

export { ForgotPasswordScreen }
