import React, { useRef, useCallback, useState, useMemo, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'

import assign from 'lodash/assign'
import isEqual from 'lodash/isEqual'

import i18n from 'i18n'

import ValidationService from 'services/validation'
import { signInSuccess } from 'store/slices/session'

import * as Routes from 'navigation/routes'
import { ReactNavigationPropTypes } from 'constants/propTypes'

import SEND_CODE from 'graphql/queries/sendPhoneCode.graphql'
import VERIFY_CODE from 'graphql/queries/verifyPhone.graphql'
import SIGN_UP from 'graphql/mutations/signUp.graphql'

import { TAB_HASH } from 'screens/common/constants'

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
} from './styles'

const STAGE_HASH = {
  ENTER_PHONE: 'ENTER_PHONE',
  ENTER_CODE: 'ENTER_CODE',
  ENTER_PASSWORD: 'ENTER_PASSWORD',
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

const renderCodeStage = ({
  meta: { invalid, handleSubmit },
  navigation,
  handleResend,
  loading,
  hasResend,
}) => {
  return (
    <Inner>
      <Content>
        <FormField
          name="code"
          component={FormTextInput}
          keyboardType="number-pad"
          label={i18n.t('screen.signUp.form.label.code')}
          placeholder={i18n.t('screen.signUp.form.placeholder.code')}
        />
      </Content>

      <Footer>
        {hasResend ? (
          <Button
            title={i18n.t('screen.signUp.button.resend')}
            mb={4}
            isProgress={loading}
            onPress={handleSubmit}
          />
        ) : (
          <Button
            title={i18n.t('screen.signUp.button.proceed')}
            mb={4}
            isDisabled={invalid}
            isProgress={loading}
            onPress={handleResend}
          />
        )}
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
          label={i18n.t('screen.signUp.form.label.password')}
          placeholder={i18n.t('screen.signUp.form.placeholder.password')}
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
          label={i18n.t('screen.signUp.form.label.confirmPassword')}
          placeholder={i18n.t('screen.signUp.form.placeholder.confirmPassword')}
          autoCapitalize="none"
          returnKeyType="go"
          secureTextEntry
        />
      </Content>

      <Footer>
        <Button
          title={i18n.t('screen.signUp.button.confirm')}
          isDisabled={invalid}
          isProgress={submitting}
          onPress={handleSubmit}
        />
      </Footer>
    </Inner>
  )
}

const SignUpScreen = ({ navigation }) => {
  const passwordRef = useRef()
  const phoneNumber = useRef(null)
  const [codeTimer, setCodeTimer] = useState(59)
  const [stage, setStage] = useState(STAGE_HASH.ENTER_PHONE)
  const dispatch = useDispatch()

  const [sendCode] = useLazyQuery(SEND_CODE, {
    onCompleted: () => {
      return setStage(STAGE_HASH.ENTER_CODE)
    },
  })

  const [verifyCode, { loading }] = useLazyQuery(VERIFY_CODE, {
    onCompleted: () => {
      return setStage(STAGE_HASH.ENTER_PASSWORD)
    },
  })

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: ({ signUp: { accessToken, refreshToken } }) => {
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
    if (stage === STAGE_HASH.ENTER_CODE) {
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
          phoneNumber.current = values.phone
          sendCode({ variables: values })
          break
        case STAGE_HASH.ENTER_CODE:
          verifyCode({ variables: values })
          break
        case STAGE_HASH.ENTER_PASSWORD:
          signUp({ variables: values })
          break
        default:
          break
      }
    },
    [stage, signUp, verifyCode, sendCode],
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
          code: i18n.t('screen.signUp.form.label.code'),
          phone: i18n.t('screen.signUp.form.label.phone'),
          password: i18n.t('screen.signUp.form.label.password'),
          confirmPassword: i18n.t('screen.signUp.form.label.confirmPassword'),
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
      const payload = { meta, navigation, refs: { password: passwordRef } }

      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          return renderPhoneStage(payload)
        case STAGE_HASH.ENTER_CODE:
          return renderCodeStage({
            ...payload,
            loading,
            handleResend: () => {
              setCodeTimer(59)
              return sendCode({ variables: { phone: phoneNumber } })
            },
            hasResend: codeTimer <= 0,
          })
        case STAGE_HASH.ENTER_PASSWORD:
          return renderPasswordStage(payload)
        default:
          return null
      }
    },
    [stage, navigation, loading, sendCode, codeTimer],
  )

  const displayTimer = useMemo(() => {
    if (stage === STAGE_HASH.ENTER_CODE && codeTimer > 0) {
      return <TimerText>{`00:${codeTimer}`}</TimerText>
    }
    return null
  }, [stage, codeTimer])

  const usageAndMoto = useMemo(() => {
    let usage
    let motto

    switch (stage) {
      case STAGE_HASH.ENTER_PHONE:
        usage = i18n.t('screen.signUp.phrase.enterPhoneNumber')
        motto = i18n.t('screen.signUp.phrase.mottoPhone')
        break
      case STAGE_HASH.ENTER_CODE:
        usage = i18n.t('screen.signUp.phrase.enterSecretCode')
        motto = i18n.t('screen.signUp.phrase.mottoCode')
        break
      case STAGE_HASH.ENTER_PASSWORD:
        usage = i18n.t('screen.signUp.phrase.enterPassword')
        motto = i18n.t('screen.signUp.phrase.mottoPassword')
        break
      default:
        break
    }

    return (
      <>
        <Motto>{motto}</Motto>
        <Usage>{usage}</Usage>
      </>
    )
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
          {usageAndMoto}
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
