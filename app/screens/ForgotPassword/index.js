import React, { useMemo, useRef, useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'

import assign from 'lodash/assign'

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
  Logo,
  LogoContainer,
  BackToSignIn,
  BackToSignInIcon,
  BackToSignInText,
  Middle,
  Title,
  Description,
  Instruction,
  Resend,
  Bottom,
  Form,
  FormSpy,
  FormField,
  FormTextInput,
  Inner,
  Content,
  Footer,
  Button,
} from './styles'

const STAGE_HASH = {
  ENTER_PHONE: 'ENTER_PHONE',
  ENTER_PASSWORD: 'ENTER_PASSWORD',
  CHANGE_SUCCESS: 'CHANGE_SUCCESS',
}

const renderEnterPhone = ({ meta: { invalid, submitting, handleSubmit }, loading }) => {
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
          isProgress={submitting || loading}
          onPress={handleSubmit}
        />
      </Footer>
    </Inner>
  )
}

const renderEnterPassword = ({
  loading,
  setStage,
  meta: { invalid, submitting, handleSubmit },
}) => {
  return (
    <Inner>
      <Content>
        <FormField
          name="code"
          component={FormTextInput}
          mb={5}
          blurOnSubmit={false}
          keyboardType="number-pad"
          label={i18n.t('screen.forgotPassword.form.label.code')}
          placeholder={i18n.t('screen.forgotPassword.form.placeholder.code')}
        />

        <FormField
          name="password"
          component={FormTextInput}
          label={i18n.t('screen.forgotPassword.form.label.password')}
          placeholder={i18n.t('screen.forgotPassword.form.placeholder.password')}
          autoCapitalize="none"
          returnKeyType="go"
          secureTextEntry
        />
      </Content>

      <Footer>
        <Button
          title={i18n.t('screen.forgotPassword.button.confirm')}
          mb={4}
          isDisabled={invalid}
          isProgress={submitting || loading}
          onPress={handleSubmit}
        />

        <Button
          title={i18n.t('screen.forgotPassword.button.back')}
          isOutlined
          onPress={() => {
            setStage(STAGE_HASH.ENTER_PHONE)
          }}
        />
      </Footer>
    </Inner>
  )
}

const renderChangeSuccess = ({ navigation }) => {
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
  const valuesRef = useRef({})
  const [stage, setStage] = useState(STAGE_HASH.ENTER_PHONE)

  const [resetPassword, resetResponse] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      return setStage(STAGE_HASH.ENTER_PASSWORD)
    },
  })

  const [changePassword, changeResponse] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      return setStage(STAGE_HASH.CHANGE_SUCCESS)
    },
  })

  const initialValues = useMemo(() => {
    return {
      phone: '',
      code: '',
      password: '',
    }
  }, [])

  const validate = useCallback(
    (values) => {
      const constraints = assign(
        stage === STAGE_HASH.ENTER_PHONE && {
          phone: {
            presence: {
              allowEmpty: false,
            },
          },
        },

        stage === STAGE_HASH.ENTER_PASSWORD && {
          code: {
            presence: {
              allowEmpty: false,
            },
          },
          password: {
            presence: {
              allowEmpty: false,
            },
            length: { minimum: 6, maximum: 100 },
          },
        },
      )

      return ValidationService.validate(constraints, values, {
        alias: {
          code: i18n.t('screen.forgotPassword.form.label.code'),
          phone: i18n.t('screen.forgotPassword.form.label.phone'),
          password: i18n.t('screen.forgotPassword.form.label.password'),
        },
      })
    },
    [stage],
  )

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
    [stage, changePassword, resetPassword],
  )

  const handleBackPress = useCallback(() => {
    navigation.navigate(Routes.SignIn)
  }, [navigation])

  const handleResendCode = useCallback(() => {
    resetPassword({ variables: { phone: valuesRef.current.phone } })
  }, [valuesRef, resetPassword])

  const renderInstruction = () => {
    let instruction

    switch (stage) {
      case STAGE_HASH.ENTER_PHONE:
        instruction = i18n.t('screen.forgotPassword.phrase.enterPhoneNumber')
        break
      case STAGE_HASH.ENTER_PASSWORD:
        instruction = i18n.t('screen.forgotPassword.phrase.enterPassword')
        break
      case STAGE_HASH.CHANGE_SUCCESS:
        instruction = i18n.t('screen.forgotPassword.phrase.changeSuccess')
        break
      default:
        break
    }

    return instruction ? <Instruction>{instruction}</Instruction> : null
  }

  const renderResend = () => {
    if (stage === STAGE_HASH.ENTER_PASSWORD) {
      return (
        <>
          <Instruction mt={3}>{i18n.t('screen.forgotPassword.phrase.noCode')}</Instruction>
          <Resend onResendCode={handleResendCode} />
        </>
      )
    }

    return null
  }

  const renderForm = useCallback(
    (meta) => {
      const payload = { meta, navigation, setStage }
      let content

      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          content = renderEnterPhone({ ...payload, loading: resetResponse.loading })
          break
        case STAGE_HASH.ENTER_PASSWORD:
          content = renderEnterPassword({ ...payload, loading: changeResponse.loading })
          break
        case STAGE_HASH.CHANGE_SUCCESS:
          content = renderChangeSuccess(payload)
          break
        default:
          break
      }

      return (
        <>
          {content}

          <FormSpy
            subscription={{ values: true }}
            onChange={(state) => {
              valuesRef.current = state.values
            }}
          />
        </>
      )
    },
    [stage, navigation, setStage, resetResponse, changeResponse],
  )

  return (
    <Container>
      <Scrollable fromTop toBottom>
        <Top>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          {stage !== STAGE_HASH.CHANGE_SUCCESS && (
            <BackToSignIn onPress={handleBackPress}>
              <BackToSignInIcon />

              <BackToSignInText>
                {i18n.t('screen.forgotPassword.button.backToSignIn')}
              </BackToSignInText>
            </BackToSignIn>
          )}
        </Top>

        <Middle>
          <Title>{i18n.t('screen.forgotPassword.phrase.bfast')}</Title>
          <Description>{i18n.t('screen.forgotPassword.phrase.forgotPassword')}</Description>

          {renderInstruction()}
          {renderResend()}
        </Middle>

        <Bottom>
          <Form {...{ validate, initialValues, onSubmit }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

ForgotPasswordScreen.propTypes = {
  navigation: ReactNavigationPropTypes.navigation.isRequired,
}

export { ForgotPasswordScreen }
