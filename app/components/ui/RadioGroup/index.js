import React from 'react'

import PT from 'prop-types'

import { FormRadio, FormField } from 'components/blocks'
import { Container, GroupLabel, RadioContainer } from './styles'

const RadioGroup = ({ values, label, name, ...rest }) => {
  return (
    <Container {...rest}>
      {label && <GroupLabel {...{ label }} />}

      <RadioContainer>
        {values.map((v) => {
          return <FormField key={v} name={name} component={FormRadio} type="radio" value={v} />
        })}
      </RadioContainer>
    </Container>
  )
}

RadioGroup.propTypes = {
  label: PT.string,
  name: PT.string,
  values: PT.arrayOf(PT.string),
}

RadioGroup.defaultProps = {
  label: null,
  name: null,
  values: [],
}

export { RadioGroup }
