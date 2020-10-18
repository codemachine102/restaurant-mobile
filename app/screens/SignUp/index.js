import React, { useRef, useCallback, useState, useMemo } from 'react'
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

import { TAB_HASH } from 'screens/common/auth'

import {
  Container,
  Scrollable,
  Top,
  Logo,
  LogoContainer,
  Middle,
  Title,
  TabBar,
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
  ENTER_PASSWORD: 'ENTER_CODE_PASSWORD',
}

const renderPhoneStage = ({ meta: { invalid, submitting, handleSubmit }, loading }) => {
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
          isProgress={submitting || loading}
          onPress={handleSubmit}
        />
      </Footer>
    </Inner>
  )
}

const renderCodePasswordStage = ({
  meta: { invalid, handleSubmit, submitting },
  loading,
  setStage,
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
          blurOnSubmit={false}
          label={i18n.t('screen.signUp.form.label.code')}
          placeholder={i18n.t('screen.signUp.form.placeholder.code')}
        />

        <FormField
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
          isProgress={loading || submitting}
          onPress={handleSubmit}
        />

        <Button
          title={i18n.t('screen.signUp.button.back')}
          isOutlined
          onPress={() => {
            return setStage(STAGE_HASH.ENTER_PHONE)
          }}
        />
      </Footer>
    </Inner>
  )
}

const SignUpScreen = ({ navigation }) => {
  const valuesRef = useRef({})
  const [stage, setStage] = useState(STAGE_HASH.ENTER_PHONE)

  const dispatch = useDispatch()

  const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP, {
    onCompleted: () => {
      setStage(STAGE_HASH.ENTER_PASSWORD)
    },
  })

  const [verifyPhone, { loading: verifyPhoneLoading }] = useMutation(VERIFY_PHONE, {
    onCompleted: ({ verifyPhone: { accessToken, refreshToken } }) => {
      dispatch(
        signInSuccess({
          token: accessToken,
          refreshToken,
        }),
      )
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
          code: i18n.t('screen.signUp.form.label.code'),
          phone: i18n.t('screen.signUp.form.label.phone'),
          password: i18n.t('screen.signUp.form.label.password'),
        },
      })
    },
    [stage],
  )

  const onSubmit = useCallback(
    (values) => {
      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          signUp({ variables: values })
          break
        case STAGE_HASH.ENTER_PASSWORD:
          verifyPhone({ variables: values })
          break
        default:
          break
      }
    },
    [stage, signUp, verifyPhone],
  )

  const handleTabChange = useCallback(
    (nextTab) => {
      if (nextTab === TAB_HASH.SIGN_IN) {
        navigation.navigate(Routes.SignIn)
      }
    },
    [navigation],
  )

  const handleResendCode = useCallback(() => {
    signUp({ variables: { phone: valuesRef.current.phone } })
  }, [valuesRef, signUp])

  const renderResend = () => {
    if (stage === STAGE_HASH.ENTER_PASSWORD) {
      return (
        <>
          <Instruction mt={3}>{i18n.t('screen.signUp.phrase.noCode')}</Instruction>
          <Resend onResendCode={handleResendCode} />
        </>
      )
    }

    return null
  }

  const renderInstruction = () => {
    let instruction

    switch (stage) {
      case STAGE_HASH.ENTER_PHONE:
        instruction = i18n.t('screen.signUp.phrase.enterPhone')
        break
      case STAGE_HASH.ENTER_PASSWORD:
        instruction = i18n.t('screen.signUp.phrase.enterPassword')
        break
      default:
        break
    }

    return instruction && <Instruction>{instruction}</Instruction>
  }

  const renderForm = useCallback(
    (meta) => {
      const payload = { meta, navigation, setStage }
      let content

      switch (stage) {
        case STAGE_HASH.ENTER_PHONE:
          content = renderPhoneStage({ ...payload, loading: signUpLoading })
          break
        case STAGE_HASH.ENTER_PASSWORD:
          content = renderCodePasswordStage({ ...payload, loading: verifyPhoneLoading })
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
    [stage, navigation, signUpLoading, verifyPhoneLoading],
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
              { id: TAB_HASH.SIGN_IN, label: i18n.t('screen.signUp.phrase.signIn') },
              { id: TAB_HASH.SIGN_UP, label: i18n.t('screen.signUp.phrase.signUp') },
            ]}
            activeId={TAB_HASH.SIGN_UP}
            isFluid={false}
            onTabChange={handleTabChange}
          />
        </Top>

        <Middle>
          <Title>{i18n.t('screen.signUp.phrase.title')}</Title>
          <Description>{i18n.t('screen.signUp.phrase.motto')}</Description>

          {renderInstruction()}
          {renderResend()}
        </Middle>

        <Bottom>
          <Form {...{ validate, onSubmit, initialValues }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

SignUpScreen.propTypes = {
  navigation: ReactNavigationPropTypes.navigation.isRequired,
}

export { SignUpScreen }
