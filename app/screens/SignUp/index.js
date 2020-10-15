import React, { useRef, useCallback, useState, useMemo, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'

import assign from 'lodash/assign'

import i18n from 'i18n'

import ValidationService from 'services/validation'
import { signInSuccess } from 'store/slices/session'

import * as Routes from 'navigation/routes'
import { ReactNavigationPropTypes } from 'constants/propTypes'

import VERIFY_PHONE from 'graphql/mutations/verifyPhone.graphql'
import SIGN_UP from 'graphql/mutations/signUp.graphql'

import { TAB_HASH } from 'screens/common/constants'
import { Text } from 'components/ui'

import {
  Container,
  Scrollable,
  Top,
  Middle,
  TimerText,
  Bottom,
  Form,
  TabBar,
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
  ResendText,
} from './styles'

const STAGE_HASH = {
  ENTER_PHONE: 'ENTER_PHONE',
  ENTER_CODE_PASSWORD: 'ENTER_CODE_PASSWORD',
}

const renderPhoneStage = ({ meta: { invalid, submitting, handleSubmit } }) => {
  return (
    <Inner>
      <Content>
        <FormField
          name="phone"
          component={FormTextInput}
          keyboardType="phone-pad"
          label={i18n.t('screen.signUp.form.label.phone')}
          placeholder={i18n.t('screen.signUp.form.placeholder.phone')}
          autoCapitalize="none"
        />
      </Content>

      <Footer>
        <Button
          title={i18n.t('screen.signUp.button.proceed')}
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
          keyboardType="number-pad"
          returnKeyType="next"
          label={i18n.t('screen.signUp.form.label.code')}
          placeholder={i18n.t('screen.signUp.form.placeholder.code')}
          onSubmitEditing={() => {
            return secondFieldRef?.current.focus()
          }}
        />

        <FormField
          innerRef={secondFieldRef}
          name="password"
          component={FormTextInput}
          label={i18n.t('screen.signUp.form.label.password')}
          placeholder={i18n.t('screen.signUp.form.placeholder.password')}
          autoCapitalize="none"
          returnKeyType="go"
          secureTextEntry
        />
      </Content>

      <Footer>
        <Button
          title={i18n.t('screen.signUp.button.confirm')}
          mb={4}
          isDisabled={invalid}
          isProgress={loading}
          onPress={handleSubmit}
        />
        <Button
          title={i18n.t('screen.signUp.button.back')}
          isOutlined
          onPress={() => {
            return navigation.goBack()
          }}
        />
      </Footer>
    </Inner>
  )
}

const SignUpScreen = ({ navigation }) => {
  const secondFieldRef = useRef()
  const phoneNumberRef = useRef(null)
  const [codeTimer, setCodeTimer] = useState(59)
  const [stage, setStage] = useState(STAGE_HASH.ENTER_PHONE)
  const dispatch = useDispatch()

  const [sendCode, { loading }] = useMutation(SIGN_UP, {
    onCompleted: () => {
      return setStage(STAGE_HASH.ENTER_CODE_PASSWORD)
    },
  })

  const [signUp] = useMutation(VERIFY_PHONE, {
    onCompleted: ({ verifyPhone: { accessToken, refreshToken } }) => {
      dispatch(
        signInSuccess({
          token: accessToken,
          refreshToken,
        }),
      )
    },
  })
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (stage === STAGE_HASH.ENTER_CODE_PASSWORD) {
      const timer = setInterval(() => {
        setCodeTimer((v) => {
          if (v === 1) {
            clearInterval(timer)
          }
          return v - 1
        })
      }, 1000)

      return () => {
        return clearInterval(timer)
      }
    }
  }, [stage, loading])

  const onSubmit = useCallback(
    (values) => {
      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          phoneNumberRef.current = values.phone
          sendCode({ variables: values })
          break
        case STAGE_HASH.ENTER_CODE_PASSWORD:
          signUp({ variables: values })
          break
        default:
          break
      }
    },
    [stage, signUp, sendCode],
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
        stage === STAGE_HASH.ENTER_CODE_PASSWORD && {
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
          code: i18n.t('screen.signUp.form.label.code'),
          phone: i18n.t('screen.signUp.form.label.phone'),
          password: i18n.t('screen.signUp.form.label.password'),
        },
      })
    },
    [stage],
  )

  const handleTabChange = useCallback(
    (nextTab) => {
      if (nextTab === TAB_HASH.SIGN_IN) {
        navigation.navigate(Routes.SignIn)
      }
    },
    [navigation],
  )

  const renderForm = useCallback(
    (meta) => {
      const payload = { meta, navigation, refs: { secondFieldRef } }

      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          return renderPhoneStage(payload)
        case STAGE_HASH.ENTER_CODE_PASSWORD:
          return renderCodePasswordStage({
            ...payload,
            loading,
          })
        default:
          return null
      }
    },
    [stage, navigation, loading],
  )

  const displayTimer = useMemo(() => {
    if (stage === STAGE_HASH.ENTER_CODE_PASSWORD) {
      const handleResend = () => {
        setCodeTimer(59)
        return sendCode({ variables: { phone: phoneNumberRef } })
      }

      return (
        <Text>
          {i18n.t('screen.signUp.phrase.noCode')}
          {codeTimer > 0 ? (
            <TimerText>{`00:${codeTimer}`}</TimerText>
          ) : (
            <ResendText onPress={handleResend}>{i18n.t('screen.signUp.button.resend')}</ResendText>
          )}
        </Text>
      )
    }
    return null
  }, [stage, codeTimer, sendCode])

  const renderUsage = useMemo(() => {
    const usage = assign(
      {},
      stage === STAGE_HASH.ENTER_PHONE && { v: i18n.t('screen.signUp.phrase.enterPhoneNumber') },
      stage === STAGE_HASH.ENTER_CODE_PASSWORD && {
        v: i18n.t('screen.signUp.phrase.enterCode&Password'),
      },
    )

    return <Usage>{usage.v}</Usage>
  }, [stage])

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
            activeId={TAB_HASH.SIGN_UP}
            isFluid={false}
            onTabChange={handleTabChange}
          />
        </Top>

        <Middle>
          <Title>{i18n.t('screen.signUp.phrase.title')}</Title>
          <Motto>{i18n.t('screen.signUp.phrase.motto')}</Motto>
          {renderUsage}
          {displayTimer}
        </Middle>

        <Bottom>
          <Form {...{ validate, onSubmit }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

SignUpScreen.propTypes = {
  navigation: ReactNavigationPropTypes.navigation.isRequired,
}

export { SignUpScreen }
