import React from 'react'
import PT from 'prop-types'

import get from 'lodash/get'

import Utils from 'utils'

import { Container } from './styles'

const UserAvatar = ({ user, ...props }) => {
  if (!user) {
    return <Container {...props} />
  }

  return (
    <Container
      {...props}
      photo={get(user, 'profile.photoUrl')}
      placeholder={Utils.Strings.makeAcronym(Utils.UserProfile.formatFullName(user.profile))}
    />
  )
}

UserAvatar.propTypes = {
  user: PT.object,
}

UserAvatar.defaultProps = {
  user: null,
}

export { UserAvatar }
