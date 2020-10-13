import React, { useRef, useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'

import assign from 'lodash/assign'
import isEqual from 'lodash/isEqual'

import i18n from 'i18n'

import ValidationService from 'services/validation'

import * as Routes from 'navigation/routes'
import { ReactNavigationPropTypes } from 'constants/propTypes'

import RESET_PASSWORD from 'graphql/mutations/resetPassword.graphql'
import CHANGE_PASSWORD from 'graphql/mutations/changePassword.graphql'

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
  Logo,
  LogoContainer,
  Footer,
  Button,
  BackToSignIn,
  BackToSignInIcon,
  BackToSignInText,
} from './styles'

const STAGE_HASH = {
  ENTER_PHONE: 'ENTER_PHONE',
  ENTER_CODE: 'ENTER_CODE',
  ENTER_PASSWORD: 'ENTER_PASSWORD',
  SUCCESS: 'CHANGE_SUCCESS',
}

const renderPhoneStage = ({ meta: { invalid, submitting, handleSubmit } }) => {
  return (
    <Inner>
      <Content>
        <FormField
          name="phone"
          component={FormTextInput}
          keyboardType="phone-pad"
          label={i18n.t('screen.forgotPassword.form.label.phone')}
          placeholder={i18n.t('screen.forgotPassword.form.placeholder.phone')}
          autoCapitalize="none"
        />
      </Content>

      <Footer>
        <Button
          title={i18n.t('screen.forgotPassword.button.reset')}
          isDisabled={invalid}
          isProgress={submitting}
          onPress={handleSubmit}
        />
      </Footer>
    </Inner>
  )
}

const renderCodeStage = ({ meta: { invalid, submitting, handleSubmit } }) => {
  return (
    <Inner>
      <Content>
        <FormField
          name="code"
          component={FormTextInput}
          keyboardType="number-pad"
          label={i18n.t('screen.forgotPassword.form.label.code')}
          placeholder={i18n.t('screen.forgotPassword.form.placeholder.code')}
        />
      </Content>

      <Footer>
        <Button
          title={i18n.t('screen.forgotPassword.button.proceed')}
          isDisabled={invalid}
          isProgress={submitting}
          onPress={handleSubmit}
        />
      </Footer>
    </Inner>
  )
}

const renderPasswordStage = ({ refs, meta: { invalid, submitting, handleSubmit } }) => {
  const handleSubmitPassword = () => {
    refs?.password?.current.focus()
  }

  return (
    <Inner>
      <Content>
        <FormField
          name="password"
          component={FormTextInput}
          label={i18n.t('screen.forgotPassword.form.label.password')}
          placeholder={i18n.t('screen.forgotPassword.form.placeholder.password')}
          autoCapitalize="none"
          returnKeyType="next"
          mb={5}
          secureTextEntry
          blurOnSubmit={false}
          onSubmitEditing={handleSubmitPassword}
        />

        <FormField
          innerRef={refs.password}
          name="confirmPassword"
          component={FormTextInput}
          label={i18n.t('screen.forgotPassword.form.label.confirmPassword')}
          placeholder={i18n.t('screen.forgotPassword.form.placeholder.confirmPassword')}
          autoCapitalize="none"
          returnKeyType="go"
          secureTextEntry
        />
      </Content>

      <Footer>
        <Button
          title={i18n.t('screen.forgotPassword.button.change')}
          isDisabled={invalid}
          isProgress={submitting}
          onPress={handleSubmit}
        />
      </Footer>
    </Inner>
  )
}

const renderSuccess = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate(Routes.SignIn)
  }

  return (
    <Inner>
      <Footer>
        <Button title={i18n.t('screen.forgotPassword.button.signIn')} onPress={handlePress} />
      </Footer>
    </Inner>
  )
}

const ForgotPasswordScreen = ({ navigation }) => {
  const passwordRef = useRef()
  const [stage, setStage] = useState(STAGE_HASH.ENTER_PHONE)

  const validate = useCallback(
    (values) => {
      const constraints = assign(
        {},
        stage === STAGE_HASH.ENTER_PHONE && {
          phone: {
            presence: true,
          },
        },
        stage === STAGE_HASH.ENTER_CODE && {
          code: {
            presence: true,
          },
        },
        stage === STAGE_HASH.ENTER_PASSWORD && {
          password: {
            presence: true,
            length: { minimum: 6, maximum: 100 },
          },

          confirmPassword: {
            presence: true,
            length: { minimum: 6, maximum: 100 },
            equality: {
              attribute: 'password',
              comparator: isEqual,
            },
          },
        },
      )

      return ValidationService.validate(constraints, values, {
        alias: {
          code: i18n.t('screen.forgotPassword.form.label.code'),
          phone: i18n.t('screen.forgotPassword.form.label.phone'),
          password: i18n.t('screen.forgotPassword.form.label.password'),
          confirmPassword: i18n.t('screen.forgotPassword.form.label.confirmPassword'),
        },
      })
    },
    [stage],
  )

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      return setStage(STAGE_HASH.ENTER_CODE)
    },
  })

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      return setStage(STAGE_HASH.CHANGE_SUCCESS)
    },
  })

  const onSubmit = useCallback(
    (values) => {
      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          resetPassword({ variables: values })
          break
        case STAGE_HASH.ENTER_PASSWORD:
          changePassword({ variables: values })
          break
        default:
          break
      }
    },
    [stage, resetPassword, changePassword],
  )

  const handleBackPress = useCallback(() => {
    return navigation.navigate(Routes.SignIn)
  }, [navigation])

  const renderForm = useCallback(
    (meta) => {
      const payload = { meta, navigation, refs: { password: passwordRef } }

      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          return renderPhoneStage(payload)
        case STAGE_HASH.ENTER_CODE:
          return renderCodeStage(payload)
        case STAGE_HASH.ENTER_PASSWORD:
          return renderPasswordStage(payload)
        case STAGE_HASH.SUCCESS:
          return renderSuccess(payload)
        default:
          return null
      }
    },
    [stage, navigation],
  )

  const renderUsage = () => {
    let usage

    switch (stage) {
      case STAGE_HASH.ENTER_PHONE:
        usage = i18n.t('screen.forgotPassword.phrase.enterPhoneNumber')
        break
      case STAGE_HASH.ENTER_CODE:
        usage = i18n.t('screen.forgotPassword.phrase.enterSecretCode')
        break
      case STAGE_HASH.ENTER_PASSWORD:
        usage = i18n.t('screen.forgotPassword.phrase.enterPassword')
        break
      case STAGE_HASH.SUCCESS:
        usage = i18n.t('screen.forgotPassword.phrase.success')
        break
      default:
        break
    }

    return <Usage>{usage}</Usage>
  }

  return (
    <Container>
      <Scrollable fromTop toBottom>
        <Top>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          {stage !== STAGE_HASH.SUCCESS && (
            <BackToSignIn onPress={handleBackPress}>
              <BackToSignInIcon />

              <BackToSignInText>
                {i18n.t('screen.forgotPassword.button.backToSignIn')}
              </BackToSignInText>
            </BackToSignIn>
          )}
        </Top>

        <Middle>
          <Title>{i18n.t('screen.forgotPassword.phrase.title')}</Title>
          <Motto>{i18n.t('screen.forgotPassword.phrase.motto')}</Motto>

          {renderUsage()}
        </Middle>

        <Bottom>
          <Form {...{ validate, onSubmit }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

ForgotPasswordScreen.propTypes = {
  navigation: ReactNavigationPropTypes.navigation.isRequired,
}

export { ForgotPasswordScreen }
