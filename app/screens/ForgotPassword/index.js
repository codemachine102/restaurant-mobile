import React, { useRef, useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'

import assign from 'lodash/assign'

import i18n from 'i18n'

import ValidationService from 'services/validation'

import * as Routes from 'navigation/routes'
import { ReactNavigationPropTypes } from 'constants/propTypes'

import RESET_PASSWORD from 'graphql/mutations/resetPassword.graphql'
import CHANGE_PASSWORD from 'graphql/mutations/changePassword.graphql'
import { Text } from 'components/ui'

import { useTimer } from '../common/auth'

import {
  Container,
  ResendText,
  TimerText,
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

const renderCodePasswordStage = ({
  refs: { secondFieldRef },
  meta: { invalid, handleSubmit },
  navigation,
  loading,
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
          returnKeyType="next"
          label={i18n.t('screen.forgotPassword.form.label.code')}
          placeholder={i18n.t('screen.forgotPassword.form.placeholder.code')}
          onSubmitEditing={() => {
            return secondFieldRef?.current.focus()
          }}
        />

        <FormField
          innerRef={secondFieldRef}
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
          isProgress={loading}
          onPress={handleSubmit}
        />
        <Button
          title={i18n.t('screen.forgotPassword.button.back')}
          isOutlined
          onPress={() => {
            return navigation.goBack()
          }}
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
  const secondFieldRef = useRef()
  const phoneNumberRef = useRef(null)
  const [countdown, hasEnded, startCountDown] = useTimer(60)
  const [stage, setStage] = useState(STAGE_HASH.ENTER_PHONE)

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      return setStage(STAGE_HASH.ENTER_PASSWORD)
    },
  })

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      return setStage(STAGE_HASH.SUCCESS)
    },
  })

  const onSubmit = useCallback(
    (values) => {
      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          phoneNumberRef.current = values.phone
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

  const validate = useCallback(
    (values) => {
      const constraints = assign(
        {},
        stage === STAGE_HASH.ENTER_PHONE && {
          phone: {
            presence: true,
          },
        },
        stage === STAGE_HASH.ENTER_PASSWORD && {
          code: {
            presence: true,
          },
          password: {
            presence: true,
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

  const renderForm = useCallback(
    (meta) => {
      const payload = { meta, navigation, refs: { secondFieldRef } }

      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          return renderPhoneStage(payload)
        case STAGE_HASH.ENTER_PASSWORD:
          return renderCodePasswordStage({
            ...payload,
            loading,
          })
        case STAGE_HASH.SUCCESS:
          return renderSuccess(payload)
        default:
          return null
      }
    },
    [stage, navigation, loading],
  )

  const handleBackPress = useCallback(() => {
    return navigation.navigate(Routes.SignIn)
  }, [navigation])

  const renderTimer = () => {
    if (stage === STAGE_HASH.ENTER_PASSWORD) {
      const handleResend = () => {
        startCountDown()
        return resetPassword({ variables: { phone: phoneNumberRef } })
      }

      return (
        <Text>
          {`${i18n.t('screen.forgotPassword.phrase.noCode')}  `}

          {!hasEnded ? (
            <TimerText>{`00:${countdown}  `}</TimerText>
          ) : (
            <ResendText onPress={handleResend}>
              {i18n.t('screen.forgotPassword.button.resend')}
            </ResendText>
          )}
        </Text>
      )
    }
    return null
  }

  const renderUsage = () => {
    const usage = assign(
      stage === STAGE_HASH.ENTER_PHONE && {
        v: i18n.t('screen.forgotPassword.phrase.enterPhoneNumber'),
      },
      stage === STAGE_HASH.ENTER_PASSWORD && {
        v: i18n.t('screen.forgotPassword.phrase.enterPassword'),
      },
      stage === STAGE_HASH.SUCCESS && {
        v: i18n.t('screen.forgotPassword.phrase.success'),
      },
    )

    return <Usage>{usage?.v}</Usage>
  }

  const initialValues = {
    phone: '',
    code: '',
    password: '',
    withRefresh: true,
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
          {renderTimer()}
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
}

export { ForgotPasswordScreen }
