import React, { useRef, useMemo, useCallback } from 'react'

import i18n from 'i18n'

import ValidationService from 'services/validation'

import AppConfig from 'config/app'

import {
  Container,
  Scrollable,
  Top,
  Bottom,
  Form,
  FormField,
  Inner,
  Content,
  FormTextInput,
} from './styles'

// import {
//   Logo,
//   Form,
//   Field,
//   Inner,
//   Content,
//   Footer,
//   Button,
//   LinkButton,
//   FormTextInput,
// } from './styles'

const SignInScreen = () => {
  const passwordRef = useRef()

  const initialValues = useMemo(() => {
    return {
      email: AppConfig.credentials.email,
      password: AppConfig.credentials.password,
      withRefresh: true,
    }
  }, [])

  const validate = (values) => {
    const constraints = {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: { minimum: 6, maximum: 100 },
      },
    }

    return ValidationService.validate(constraints, values, {
      alias: {
        email: i18n.t('screen.signIn.form.label.email'),
        password: i18n.t('screen.signIn.form.label.password'),
      },
    })
  }

  const onSubmit = () => {}

  const handleSubmitEmail = useCallback(() => {
    passwordRef.current.focus()
  }, [])

  const renderForm = useCallback(
    ({ values, submitting, handleSubmit }) => {
      return (
        <Inner>
          <Content>
            <FormField
              name="email"
              component={FormTextInput}
              keyboardType="email-address"
              label={i18n.t('screen.signIn.form.label.email')}
              placeholder={i18n.t('screen.signIn.form.placeholder.email')}
              autoCapitalize="none"
              returnKeyType="next"
              mb={5}
              blurOnSubmit={false}
              onSubmitEditing={handleSubmitEmail}
            />

            <FormField
              innerRef={passwordRef}
              name="password"
              component={FormTextInput}
              label={i18n.t('screen.signIn.form.label.password')}
              placeholder={i18n.t('screen.signIn.form.placeholder.password')}
              autoCapitalize="none"
              returnKeyType="go"
              secureTextEntry
            />
          </Content>
        </Inner>
      )
    },
    [handleSubmitEmail],
  )

  //   <Footer>
  //   <Button
  //     title={i18n.t('screen.signIn.button.signIn')}
  //     mb={6}
  //     isProgress={submitting}
  //     onPress={handleSubmit}
  //   />

  //   <LinkButton onPress={handleForgotPassword(values)}>
  //     {i18n.t('screen.signIn.button.forgotPassword')}
  //   </LinkButton>
  // </Footer>

  return (
    <Container>
      <Scrollable fromTop toBottom>
        <Top />

        <Bottom>
          <Form {...{ validate, initialValues, onSubmit }} render={renderForm} />
        </Bottom>
      </Scrollable>
    </Container>
  )
}

export { SignInScreen }

// import React, { useRef, useMemo, useCallback } from 'react'
// import { useDispatch } from 'react-redux'

// import { signIn } from 'services/api/queries/auth'

// import { ReactNavigationPropTypes } from 'constants/propTypes'
// import * as Routes from 'navigation/routes'

// import { signInSuccess } from 'store/slices/session'

// const SignInScreen = ({ navigation }) => {
//   const dispatch = useDispatch()

//   const handleForgotPassword = useCallback(
//     (values) => {
//       return () => {
//         navigation.navigate(Routes.ForgotPassword, {
//           email: values.email,
//         })
//       }
//     },
//     [navigation],
//   )

//   const onSubmit = useCallback(
//     async (values) => {
//       const response = await signIn(values)

//       if (response.ok === false) {
//         return
//       }

//       dispatch(
//         signInSuccess({
//           token: response.accessToken,
//           refreshToken: response.refreshToken,
//         }),
//       )
//     },
//     [dispatch],
//   )

//   return (
//     <Container>
//       <Scrollable fromTop toBottom>
//       </Scrollable>
//     </Container>
//   )
// }

// SignInScreen.propTypes = {
//   navigation: ReactNavigationPropTypes.navigation.isRequired,
// }

// export { SignInScreen }
