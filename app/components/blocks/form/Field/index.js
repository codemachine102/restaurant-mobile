import styled from 'styled-components/native'
import { Field } from 'react-final-form'

import identity from 'lodash/identity'

export const FormField = styled(Field).attrs(() => {
  return {
    // NOTE: https://github.com/final-form/react-final-form/issues/130#issuecomment-425482365
    parse: identity,
  }
})``
