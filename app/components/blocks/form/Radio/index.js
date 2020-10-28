import React from 'react'

import Utils from 'utils'

import { FinalFormPropTypes } from 'constants/propTypes'

import { Container } from './styles'

const FormRadio = ({ input, meta, ...props }) => {
  return <Container {...props} {...input} error={Utils.Form.getFieldError(meta)} />
}

FormRadio.propTypes = {
  input: FinalFormPropTypes.input.isRequired,
  meta: FinalFormPropTypes.meta.isRequired,
}

export { FormRadio }
