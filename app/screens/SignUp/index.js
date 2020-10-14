import React, { useRef, useCallback, useState, useMemo } from 'react'
import { useMutation } from '@apollo/client'

import assign from 'lodash/assign'
import isEqual from 'lodash/isEqual'

import i18n from 'i18n'

import ValidationService from 'services/validation'

import * as Routes from 'navigation/routes'
import { ReactNavigationPropTypes } from 'constants/propTypes'

import RESET_PASSWORD from 'graphql/mutations/resetPassword.graphql'
import CHANGE_PASSWORD from 'graphql/mutations/changePassword.graphql'

import { TAB_HASH } from '../Common/constants'

import {
  Container,
  Scrollable,
  Top,
  Middle,
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
  meta: { invalid, submitting, handleSubmit },
  navigation,
  // isValidCode,
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
        <Button
          title={i18n.t('screen.signUp.button.resend')}
          mb={4}
          isDisabled={invalid}
          isProgress={submitting}
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
          code: i18n.t('screen.signUp.form.label.code'),
          phone: i18n.t('screen.signUp.form.label.phone'),
          password: i18n.t('screen.signUp.form.label.password'),
          confirmPassword: i18n.t('screen.signUp.form.label.confirmPassword'),
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
          return renderCodeStage(payload)
        case STAGE_HASH.ENTER_PASSWORD:
          return renderPasswordStage(payload)
        default:
          return null
      }
    },
    [stage, navigation],
  )

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
