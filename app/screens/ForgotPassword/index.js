import React, { useRef, useCallback, useState, useMemo } from 'react'

import i18n from 'i18n'

import ValidationService from 'services/validation'

import { ReactNavigationPropTypes } from 'constants/propTypes'
import AppConfig from 'config/app'

import * as Routes from 'navigation/routes'

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
  BackToSignInLink,
} from './styles'

function validate(values) {
  const constraints = {
    password: {
      presence: true,
      length: { minimum: 6, maximum: 100 },
    },
    passwordConfirm: {
      presence: true,
      equality: {
        attribute: 'password',
        comparator: (v1, v2) => {
          return v1 === v2
        },
      },
    },
    phone: {
      presence: true,
    },
  }

  return ValidationService.validate(constraints, values, {
    alias: {
      phone: i18n.t('screen.forgotPassword.form.lable.phone'),
      password: i18n.t('screen.forgotPassword.form.label.password'),
      passwordConfirm: i18n.t('screen.forgotPassword.form.label.passwordConfirm'),
    },
  })
}

const progress = {
  phone: 'Phone',
  code: 'Code',
  password: 'Password',
  success: 'Success',
}

const ForgotPasswordScreen = ({ navigation, route }) => {
  const [stage, setStage] = useState(progress.phone)

  const initialValues = useMemo(() => {
    return {
      phone: route.params?.phone || AppConfig.credentials.phone || '',
      withRefresh: true,
    }
  }, [route])

  const passwordRef = useRef()

  const onSubmit = () => {
    setStage(progress.code)
  }

  const focusPasword = useCallback(() => {
    return passwordRef.current?.focus()
  }, [])

  const renderForm = useCallback(
    ({ submitting, handleSubmit }) => {
      switch (stage) {
        case progress.phone:
          return (
            <Inner>
              <Content mb={11}>
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
                  mb={4}
                  isProgress={submitting}
                  isLast
                  onPress={handleSubmit}
                />
              </Footer>
            </Inner>
          )
        case progress.code:
        case progress.password:
          return (
            <Inner>
              <Content>
                <FormField
                  name="password"
                  component={FormTextInput}
                  label={i18n.t('screen.forgotPassword.form.label.password')}
                  placeholder={i18n.t('screen.forgotPassword.form.placeholder.password')}
                  autoCapitalize="none"
                  mb={5}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={focusPasword}
                  secureTextEntry
                />

                <FormField
                  innerRef={passwordRef}
                  name="newPassword"
                  component={FormTextInput}
                  label={i18n.t('screen.forgotPassword.form.label.passwordConfirm')}
                  placeholder={i18n.t('screen.forgotPassword.form.placeholder.passwordConfirm')}
                  autoCapitalize="none"
                  returnKeyType="go"
                  secureTextEntry
                />
              </Content>

              <Footer>
                <Button
                  title={i18n.t('screen.forgotPassword.button.change')}
                  mb={4}
                  isProgress={submitting}
                  onPress={handleSubmit}
                />
              </Footer>
            </Inner>
          )
        case progress.success:
        default:
          return null
      }
    },
    [focusPasword, stage],
  )

  const navigateToSignIn = () => {
    return navigation.navigate(Routes.SignIn)
  }

  return (
    <Container>
      <Scrollable fromTop toBottom>
        <Top>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <BackToSignInLink onPress={navigateToSignIn}>
            {i18n.t('screen.forgotPassword.button.back')}
          </BackToSignInLink>
        </Top>

        <Middle>
          <Title>{i18n.t('screen.forgotPassword.phrase.title')}</Title>
          <Motto>{i18n.t('screen.forgotPassword.phrase.motto')}</Motto>
          <Usage>{i18n.t(`screen.forgotPassword.phrase.usage${stage}`)}</Usage>
        </Middle>

        <Bottom>
          <Form {...{ validate, onSubmit, initialValues }} render={renderForm} />
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
