import React from 'react'
import PT from 'prop-types'

import { Container, Value, FieldLabel, Outer, Inner, InnerContainer } from './styles'

const Radio = ({ input: { onChange, value, isChecked }, label, ...rest }) => {
  return (
    <Container {...rest}>
      {label && <FieldLabel {...{ label }} />}

      <InnerContainer onPress={onChange}>
        <Outer>
          <Inner {...{ isChecked }} />
        </Outer>

        <Value>{value}</Value>
      </InnerContainer>
    </Container>
  )
}

Radio.propTypes = {
  input: PT.object.isRequired,
  label: PT.string,
}

Radio.defaultProps = {
  label: null,
}

export { Radio }
