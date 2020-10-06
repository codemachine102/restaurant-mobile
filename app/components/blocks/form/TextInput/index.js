import React from 'react'

import Utils from 'utils'

import { FinalFormPropTypes } from 'constants/propTypes'

import { Container } from './styles'

const FormTextInput = ({ input, meta, ...rest }) => {
  return <Container {...rest} {...input} error={Utils.Form.getFieldError(meta)} />
}

FormTextInput.propTypes = {
  input: FinalFormPropTypes.input.isRequired,
  meta: FinalFormPropTypes.meta.isRequired,
}

export { FormTextInput }
