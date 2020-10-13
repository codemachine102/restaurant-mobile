import React, { useRef, useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'

import i18n from 'i18n'
import RESET from 'graphql/mutations/resetPassword.graphql'
import CHANGE from 'graphql/mutations/changePassword.graphql'

import ValidationService from 'services/validation'

import { ReactNavigationPropTypes } from 'constants/propTypes'

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

const progress = {
  phone: 'Phone',
  code: 'Code',
  password: 'Password',
  success: 'Success',
}

const ForgotPasswordScreen = ({ navigation }) => {
  const passwordRef = useRef()
  const [stage, setStage] = useState(progress.phone)

  const [resetPass] = useMutation(RESET, {
    onCompleted: () => {
      return setStage(progress.code)
    },
  })

  const [changePass] = useMutation(CHANGE, {
    onCompleted: () => {
      return setStage(progress.success)
    },
  })

  const onSubmit = useCallback(
    (values) => {
      switch (stage) {
        case progress.phone:
          resetPass({ variables: values })
          break
        case progress.code:
        case progress.password:
          changePass({ variables: values })
          break
        default:
          break
      }
    },
    [stage, resetPass, changePass],
  )

  const focusPasword = useCallback(() => {
    return passwordRef.current?.focus()
  }, [])

  const validate = useCallback(
    (values) => {
      let constraints
      switch (stage) {
        case progress.phone:
          constraints = {
            phone: {
              presence: true,
            },
          }
          break
        case progress.code:
          constraints = {}
          break
        case progress.password:
          constraints = {
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
          }
          break
        default:
      }

      return ValidationService.validate(constraints, values, {
        alias: {
          phone: i18n.t('screen.forgotPassword.form.lable.phone'),
          password: i18n.t('screen.forgotPassword.form.label.password'),
          passwordConfirm: i18n.t('screen.forgotPassword.form.label.passwordConfirm'),
        },
      })
    },
    [stage],
  )

  const renderForm = useCallback(
    ({ submitting, handleSubmit, invalid }) => {
      switch (stage) {
        case progress.phone:
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
                  mb={4}
                  disabled={invalid}
                  isProgress={submitting}
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
                  disabled={invalid}
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
            {/* <LeftArrow /> */}
            {i18n.t('screen.forgotPassword.button.back')}
          </BackToSignInLink>
        </Top>

        <Middle>
          <Title>{i18n.t('screen.forgotPassword.phrase.title')}</Title>
          <Motto>{i18n.t('screen.forgotPassword.phrase.motto')}</Motto>
          <Usage>{i18n.t(`screen.forgotPassword.phrase.usage${stage}`)}</Usage>
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
