import React, { useCallback } from 'react'
import PT from 'prop-types'

import map from 'lodash/map'
import noop from 'lodash/noop'

import Utils from 'utils'

import {
  Container,
  FieldLabel,
  FieldBottom,
  OptionListContainer,
  ItemSeparator,
  OptionItem,
} from './styles'

const RadioGroup = ({
  value,
  options,
  label,
  error,
  isFluid,
  isHorizontal,
  isErrorMessageHidden,
  onChange,
  ...props
}) => {
  const renderOption = useCallback(
    (optionItem) => {
      return (
        <OptionItem
          {...{ isFluid, onChange }}
          key={optionItem.value}
          option={optionItem}
          isChecked={value === optionItem.value}
        />
      )
    },
    [value, isFluid, onChange],
  )

  const renderItemSeparator = useCallback(
    ({ id }) => {
      return <ItemSeparator {...{ isHorizontal }} key={`optionListSeparator-${id}`} />
    },
    [isHorizontal],
  )

  const optionListEl = Utils.Presentational.getListWithSeparators({
    list: map(options, renderOption),
    renderSeparator: renderItemSeparator,
  })

  return (
    <Container {...props}>
      <FieldLabel {...{ label }} />

      <OptionListContainer {...{ isHorizontal }}>{optionListEl}</OptionListContainer>

      <FieldBottom {...{ error, isErrorMessageHidden }} />
    </Container>
  )
}

RadioGroup.propTypes = {
  error: PT.oneOfType([PT.array, PT.string]),
  isErrorMessageHidden: PT.bool,
  isFluid: PT.bool,
  isHorizontal: PT.bool,
  label: PT.string,
  options: PT.array,
  value: PT.string,
  onChange: PT.func,
}

RadioGroup.defaultProps = {
  error: null,
  isErrorMessageHidden: false,
  isFluid: false,
  isHorizontal: false,
  label: null,
  onChange: noop,
  options: [],
  value: null,
}

export { RadioGroup }
