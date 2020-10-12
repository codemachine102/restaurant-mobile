import React, { useRef, useCallback } from 'react'

import i18n from 'i18n'
import Utils from 'utils'

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
  UsageHighlight,
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
      // regex: {
      //   pattern: '(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])',
      //   message: 'Must contain a capital, lowercase, and number',
      // },
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

  return ValidationService.validate(constraints, values, {
    alias: {
      password: i18n.t('screen.resetPassword.form.label.password'),
      passwordConfirm: i18n.t('screen.resetPassword.form.label.newPassword'),
    },
  })
}

const ResetPasswordScreen = ({ navigation }) => {
  const passwordRef = useRef()

  //   const [resetPassword] = useMutation(RESET_PASSWORD)

  const onSubmit = () => {}

  const renderForm = useCallback(({ submitting, handleSubmit }) => {
    return (
      <Inner>
        <Content>
          <FormField
            name="password"
            component={FormTextInput}
            label={i18n.t('screen.resetPassword.form.label.password')}
            placeholder={i18n.t('screen.resetPassword.form.placeholder.password')}
            autoCapitalize="none"
            mb={5}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              return passwordRef.current?.focus()
            }}
            secureTextEntry
          />
          <FormField
            innerRef={passwordRef}
            name="passwordConfirm"
            component={FormTextInput}
            label={i18n.t('screen.resetPassword.form.label.newPassword')}
            placeholder={i18n.t('screen.resetPassword.form.placeholder.newPassword')}
            autoCapitalize="none"
            returnKeyType="go"
            secureTextEntry
          />
        </Content>

        <Footer>
          <Button
            title={i18n.t('screen.resetPassword.button.send')}
            mb={4}
            isProgress={submitting}
            onPress={handleSubmit}
          />
        </Footer>
      </Inner>
    )
  }, [])

  const usage = Utils.Strings.replaceWithComponent(
    i18n.t('screen.resetPassword.phrase.usage'),
    (match, i) => {
      return <UsageHighlight key={match + i}>{match}</UsageHighlight>
    },
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
            {i18n.t('screen.resetPassword.button.back')}
          </BackToSignInLink>
        </Top>

        <Middle>
          <Title>{i18n.t('screen.resetPassword.phrase.title')}</Title>
          <Motto>{i18n.t('screen.resetPassword.phrase.motto')}</Motto>
          <Usage>{usage}</Usage>
        </Middle>

        <Bottom>
          <Form {...{ validate, onSubmit }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

ResetPasswordScreen.propTypes = {
  navigation: ReactNavigationPropTypes.navigation.isRequired,
}

export { ResetPasswordScreen }
