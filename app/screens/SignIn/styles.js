import styled from 'styled-components/native'

import { Box, Link } from 'components/ui'

export { Form } from 'react-final-form'
export { Container, Scrollable } from 'components/common'
export { FormField, FormTextInput } from 'components/blocks'
export { Button } from 'components/ui'

export const Top = styled.View`
  flex-grow: 1;
`

export const Bottom = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const Inner = styled.View``

export const Content = styled.View``

export const Footer = styled(Box).attrs(() => {
  return {
    mt: 8,
  }
})``

export const LinkButton = styled(Link).attrs(() => {
  return {
    messageProps: {
      fontFamilyStyle: 'style.semiBold',

      style: {
        textAlign: 'center',
      },
    },
  }
})`
  background-color: green;
`

// import { logoImage } from 'assets/images'

// export { Form, Field } from 'react-final-form'

// export const Logo = styled(Image).attrs(() => {
//   return {
//     source: logoImage,
//   }
// })`
//   width: 152px;
//   height: 175px;
// `
