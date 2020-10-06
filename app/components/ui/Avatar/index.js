import React, { useMemo } from 'react'
import PT from 'prop-types'

import clamp from 'lodash/clamp'
import round from 'lodash/round'

import Utils from 'utils'

import { ViewPropTypes, StyledPropTypes } from 'constants/propTypes'

import { Container, Placeholder, PlaceholderIcon, Photo, CounterContainer, Counter } from './styles'

const Avatar = ({
  photo,
  shape,
  placeholder,
  placeholderIcon,
  size,
  variant,
  count,
  countCap,
  isUncountable,
  style,
  renderOverlay,
}) => {
  const geometry = useMemo(() => {
    const cBaseValue = round(size / 2)
    const sBaseValue = round(clamp(Utils.Data.percentageOfNumber(size, 12), 4, 24))
    const breakpoint = 30

    return {
      circle: {
        width: size,
        borderRadius: cBaseValue,
      },

      circlePhoto: {
        width: size,
        borderRadius: cBaseValue,
      },

      circleCounterCounter: {
        marginTop: -sBaseValue + 4,
        marginRight: -sBaseValue + 4,
      },

      square: {
        width: size,
        borderRadius: sBaseValue,
      },

      squarePhoto: {
        width: size,
        borderRadius: sBaseValue,
      },

      squareCounterContainer: {
        marginTop: -sBaseValue,
        marginRight: -sBaseValue,
      },

      placeholder: {
        fontSize: Utils.Data.percentageOfNumber(size, size < breakpoint ? 48 : 40),
      },

      placeholderIcon: {
        width: Utils.Data.percentageOfNumber(size, size < breakpoint ? 32 : 24),
      },
    }
  }, [size])

  const containerShapeStyle = shape === 'square' ? geometry.square : geometry.circle
  const counterContainerShapeStyle =
    shape === 'square' ? geometry.squareCounterContainer : geometry.circleCounterCounter
  const photoShapeStyle = shape === 'square' ? geometry.squarePhoto : geometry.circlePhoto

  const counterEl = (count > 0 || isUncountable) && (
    <CounterContainer style={counterContainerShapeStyle}>
      <Counter {...{ count }} cap={countCap} />
    </CounterContainer>
  )

  const overlayEl = renderOverlay ? renderOverlay() : null

  const renderPlaceholder = () => {
    return placeholder ? (
      <Placeholder
        {...{ variant }}
        textColor={Utils.Strings.stringToColor(placeholder)}
        style={geometry.placeholder}
      >
        {placeholder}
      </Placeholder>
    ) : (
      <PlaceholderIcon {...{ variant }} glyph={placeholderIcon} style={geometry.placeholderIcon}>
        {placeholder}
      </PlaceholderIcon>
    )
  }

  const renderPhoto = () => {
    if (photo) {
      return <Photo image={photo} style={photoShapeStyle} />
    }

    return null
  }

  return (
    <Container {...{ variant }} style={[style, containerShapeStyle]}>
      {renderPlaceholder()}
      {renderPhoto()}

      {overlayEl}
      {counterEl}
    </Container>
  )
}

Avatar.propTypes = {
  count: PT.number,
  countCap: PT.number,
  isUncountable: PT.bool,
  photo: PT.string,
  placeholder: PT.string,
  placeholderIcon: PT.number,
  renderOverlay: PT.func,
  shape: PT.oneOf(['circle', 'square']),
  size: PT.number,
  style: ViewPropTypes.style,
  variant: StyledPropTypes.variant,
}

Avatar.defaultProps = {
  count: null,
  countCap: 99,
  isUncountable: false,
  photo: null,
  placeholder: null,
  placeholderIcon: null,
  renderOverlay: null,
  shape: 'square',
  size: 40,
  style: {},
  variant: 'primary',
}

export { Avatar }
