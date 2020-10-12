import styled from 'styled-components/native'
import { defaultProps } from 'recompose'

const TouchableOpacity = defaultProps({
  activeOpacity: 0.8,
  isDisabled: false,
})(
  styled.TouchableOpacity.attrs((props) => {
    return {
      disabled: props.isDisabled,
    }
  })``,
)

export { TouchableOpacity }
