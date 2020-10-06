import styled from 'styled-components/native'

import { userIcon } from 'assets/images'

import { Avatar } from 'components/ui'

export const Container = styled(Avatar).attrs(() => {
  return {
    placeholderIcon: userIcon,
  }
})``
