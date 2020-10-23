import React from 'react'

import { Radio } from 'components/ui/Radio'
import { FinalFormPropTypes } from 'constants/propTypes'

const FormRadio = ({ input: { onChange, value, checked }, ...rest }) => {
  return (
    <Radio
      {...rest}
      input={{
        value,
        isChecked: checked,
        onChange: () => {
          return onChange({ target: { value } })
        },
      }}
    />
  )
}

FormRadio.propTypes = {
  input: FinalFormPropTypes.input.isRequired,
}

export { FormRadio }
