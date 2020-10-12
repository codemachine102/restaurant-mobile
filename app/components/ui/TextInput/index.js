import React, { useState, useCallback } from 'react'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Container, FieldLabel, FieldBottom, Input } from './styles'

const TextInput = ({
  value,
  label,
  placeholder,
  error,
  innerRef,
  isDisabled,
  isErrorMessageHidden,
  blurOnSubmit,
  returnKeyType,
  keyboardType,
  onChange,
  secureTextEntry,
  autoCapitalize,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasError = !!error

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [setIsFocused])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [setIsFocused])

  return (
    <Container {...props}>
      <FieldLabel {...{ label, isFocused }} />

      <Input
        {...{
          value,
          placeholder,
          secureTextEntry,
          keyboardType,
          returnKeyType,
          blurOnSubmit,
          isFocused,
          isDisabled,
          hasError,
          autoCapitalize,
        }}
        ref={innerRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeText={onChange}
      />

      <FieldBottom {...{ error, isErrorMessageHidden }} />
    </Container>
  )
}

TextInput.propTypes = {
  autoCapitalize: PT.string,
  blurOnSubmit: PT.bool,
  error: PT.oneOfType([PT.array, PT.string]),
  innerRef: PT.object,
  isDisabled: PT.bool,
  isErrorMessageHidden: PT.bool,
  keyboardType: PT.string,
  label: PT.string,
  placeholder: PT.string,
  returnKeyType: PT.string,
  secureTextEntry: PT.bool,
  style: ViewPropTypes.style,
  value: PT.string,
  onChange: PT.func.isRequired,
}

TextInput.defaultProps = {
  autoCapitalize: 'sentences',
  blurOnSubmit: true,
  error: null,
  innerRef: null,
  isDisabled: false,
  isErrorMessageHidden: false,
  keyboardType: 'default',
  label: null,
  placeholder: 'Type something',
  returnKeyType: 'done',
  secureTextEntry: false,
  style: {},
  value: '',
}

export { TextInput }
