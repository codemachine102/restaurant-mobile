import styled, { css } from 'styled-components/native'

import { Box } from '../../Box'

export { Radio } from '../../Radio'

export const Container = styled(Box)`
  ${(props) => {
    return (
      props.isFluid &&
      css`
        flex: 1;
      `
    )
  }}
`
