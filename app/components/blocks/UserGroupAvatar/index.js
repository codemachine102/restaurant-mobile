import React, { useMemo, useCallback } from 'react'
import PT from 'prop-types'

import clamp from 'lodash/clamp'
import nth from 'lodash/nth'
import round from 'lodash/round'

import Utils from 'utils'

import { Container, CapOverlay, Cap } from './styles'

const UserGroupAvatar = ({ users, size, shape, ...props }) => {
  const geometry = useMemo(() => {
    const cBaseValue = round(size / 2)
    const sBaseValue = round(clamp(Utils.Data.percentageOfNumber(size, 16), 6, 24))

    return {
      circle: {
        width: size,
        borderRadius: cBaseValue,
      },

      square: {
        width: size,
        borderRadius: sBaseValue,
      },

      cap: {
        fontSize: Utils.Data.percentageOfNumber(size, 40),
      },
    }
  }, [size])

  const renderOverlay = useCallback(() => {
    const cap = Math.max(users.length - 1, 0)

    if (cap === 0) {
      return null
    }

    const overlayStyle = shape === 'square' ? geometry.square : geometry.circle

    return (
      <CapOverlay style={overlayStyle}>
        <Cap style={geometry.cap}>+{cap}</Cap>
      </CapOverlay>
    )
  }, [shape, geometry, users.length])

  return (
    <Container
      {...props}
      {...{ size, shape, renderOverlay }}
      user={nth(users, 0) || nth(users, 1)}
    />
  )
}

UserGroupAvatar.propTypes = {
  shape: PT.string,
  size: PT.number,
  users: PT.array.isRequired,
}

UserGroupAvatar.defaultProps = {
  shape: 'square',
  size: 40,
}

export { UserGroupAvatar }
