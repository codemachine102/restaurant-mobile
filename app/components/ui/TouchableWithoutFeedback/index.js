import styled from 'styled-components/native'
import { defaultProps } from 'recompose'

import { TouchableWithoutFeedback as RNTouchableWithoutFeedback } from 'react-native-gesture-handler'

const TouchableWithoutFeedback = defaultProps({
  isDisabled: false,
})(
  styled(RNTouchableWithoutFeedback).attrs((props) => {
    return {
      disabled: props.isDisabled,
    }
  })``,
)

export { TouchableWithoutFeedback }
