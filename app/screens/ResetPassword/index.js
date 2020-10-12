import React, { useRef, useCallback } from 'react'

import i18n from 'i18n'
import Utils from 'utils'

import ValidationService from 'services/validation'

import { ReactNavigationPropTypes } from 'constants/propTypes'

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
  // BackToSignInLink,
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
        attribute: 'pass',
        message: 'Passwords do not match',
        comparator: (v1, v2) => {
          return v1 === v2
        },
      },
    },
  }

  return ValidationService.validate(constraints, values, {
    alias: {
      password: i18n.t('screen.signIn.form.label.phone'),
      passwordConfirm: i18n.t('screen.signIn.form.label.password'),
    },
  })
}

const ResetPasswordScreen = () => {
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
            label={i18n.t('screen.signIn.form.label.password')}
            placeholder={i18n.t('screen.signIn.form.placeholder.password')}
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
            label={i18n.t('screen.signIn.form.label.password')}
            placeholder={i18n.t('screen.signIn.form.placeholder.password')}
            autoCapitalize="none"
            returnKeyType="go"
            secureTextEntry
          />
        </Content>

        <Footer>
          <Button
            title={i18n.t('screen.signIn.button.signIn')}
            mb={4}
            isProgress={submitting}
            onPress={handleSubmit}
          />
        </Footer>
      </Inner>
    )
  }, [])

  const usage = Utils.Strings.replaceWithComponent(
    i18n.t('screen.signIn.phrase.usage'),
    (match, i) => {
      return <UsageHighlight key={match + i}>{match}</UsageHighlight>
    },
  )

  return (
    <Container>
      <Scrollable fromTop toBottom>
        <Top>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          {/* <BackToSignInLink>Back</BackToSignInLink> */}
        </Top>

        <Middle>
          <Title>{i18n.t('screen.signIn.phrase.title')}</Title>
          <Motto>{i18n.t('screen.signIn.phrase.motto')}</Motto>
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
