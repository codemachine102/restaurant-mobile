import React, { useRef, useMemo, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'

import get from 'lodash/get'

import i18n from 'i18n'
import Utils from 'utils'

import ValidationService from 'services/validation'

import * as Routes from 'navigation/routes'

import SIGN_IN from 'graphql/mutations/signIn.graphql'

import AppConfig from 'config/app'

import { ReactNavigationPropTypes } from 'constants/propTypes'

import { signInSuccess } from 'store/slices/session'

import {
  Container,
  Scrollable,
  Top,
  Middle,
  Bottom,
  Form,
  FormField,
  Inner,
  Content,
  FormTextInput,
  Title,
  Motto,
  Usage,
  UsageHighlight,
  Logo,
  LogoContainer,
  TabBar,
  Footer,
  Button,
  LinkButton,
} from './styles'

const TAB_HASH = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
}

const SignInScreen = ({ navigation }) => {
  const passwordRef = useRef()

  const dispatch = useDispatch()
  const [signIn] = useMutation(SIGN_IN)

  const initialValues = useMemo(() => {
    return {
      phone: AppConfig.credentials.phone,
      password: AppConfig.credentials.password,
      withRefresh: true,
    }
  }, [])

  const validate = (values) => {
    const constraints = {
      phone: {
        presence: true,
      },
      password: {
        presence: true,
        length: { minimum: 6, maximum: 100 },
      },
    }

    return ValidationService.validate(constraints, values, {
      alias: {
        phone: i18n.t('screen.signIn.form.label.phone'),
        password: i18n.t('screen.signIn.form.label.password'),
      },
    })
  }

  const onSubmit = useCallback(
    async (values) => {
      try {
        const signInMutation = await signIn({ variables: values })
        const signInResponse = get(signInMutation, 'data.signInByEmail')

        dispatch(
          signInSuccess({
            token: signInResponse.accessToken,
            refreshToken: signInResponse.refreshToken,
          }),
        )
      } catch (error) {} // eslint-disable-line no-empty
    },
    [signIn, dispatch],
  )

  const handleSubmitPhone = useCallback(() => {
    passwordRef.current.focus()
  }, [])

  const handleForgotPassword = useCallback(
    (values) => {
      return () => {
        navigation.navigate(Routes.ForgotPassword, {
          phone: values.phone,
        })
      }
    },
    [navigation],
  )

  const renderForm = useCallback(
    ({ values, submitting, handleSubmit }) => {
      return (
        <Inner>
          <Content>
            <FormField
              name="phone"
              component={FormTextInput}
              keyboardType="phone-pad"
              label={i18n.t('screen.signIn.form.label.phone')}
              placeholder={i18n.t('screen.signIn.form.placeholder.phone')}
              autoCapitalize="none"
              returnKeyType="next"
              mb={5}
              blurOnSubmit={false}
              onSubmitEditing={handleSubmitPhone}
            />

            <FormField
              innerRef={passwordRef}
              name="password"
              component={FormTextInput}
              label={i18n.t('screen.signIn.form.label.password')}
              placeholder={i18n.t('screen.signIn.form.placeholder.password')}
              autoCapitalize="none"
              returnKeyType="go"
              secureTextEntry
            />
          </Content>

          <Footer>
            <Button
              title={i18n.t('screen.signIn.button.signIn')}
              mb={4}
              isProgress={submitting}
              onPress={handleSubmit}
            />

            <Button
              title={i18n.t('screen.signIn.button.signIn')}
              mb={4}
              isOutlined
              isProgress={submitting}
              onPress={handleSubmit}
            />

            <Button
              title={i18n.t('screen.signIn.button.signIn')}
              mb={4}
              isDisabled
              isProgress={submitting}
              onPress={handleSubmit}
            />

            <Button
              title={i18n.t('screen.signIn.button.signIn')}
              mb={4}
              isDisabled
              isOutlined
              isProgress={submitting}
              onPress={handleSubmit}
            />

            <LinkButton onPress={handleForgotPassword(values)}>
              {i18n.t('screen.signIn.button.forgotPassword')}
            </LinkButton>
          </Footer>
        </Inner>
      )
    },
    [handleForgotPassword, handleSubmitPhone],
  )

  const usage = Utils.Strings.replaceWithComponent(
    i18n.t('screen.signIn.phrase.usage'),
    (match, i) => {
      return <UsageHighlight key={match + i}>{match}</UsageHighlight>
    },
  )

  return (
    <Container>
      <Scrollable fromTop toBottom>
        <Top>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <TabBar
            tabs={[
              { id: TAB_HASH.SIGN_IN, label: i18n.t('screen.signIn.phrase.signIn') },
              { id: TAB_HASH.SIGN_UP, label: i18n.t('screen.signIn.phrase.signUp') },
            ]}
            activeId={TAB_HASH.SIGN_IN}
            isFluid={false}
          />
        </Top>

        <Middle>
          <Title>{i18n.t('screen.signIn.phrase.title')}</Title>
          <Motto>{i18n.t('screen.signIn.phrase.motto')}</Motto>
          <Usage>{usage}</Usage>
        </Middle>

        <Bottom>
          <Form {...{ validate, initialValues, onSubmit }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

SignInScreen.propTypes = {
  navigation: ReactNavigationPropTypes.navigation.isRequired,
}

export { SignInScreen }
