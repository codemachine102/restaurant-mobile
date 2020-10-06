import { getColor } from '../../../helpers'

export default {
  input: {
    bg: {
      primary: getColor('white'),
      secondary: getColor('clear'),
    },
    color: {
      primary: getColor('gunPowder'),
      secondary: getColor('monaLisa'),
    },
    borderColor: {
      primary: getColor('santasGray'),
      secondary: getColor('white'),
    },
    selectionColor: {
      primary: getColor('minsk'),
      secondary: getColor('monaLisa'),
    },
    placeholderTextColor: {
      primary: getColor('santasGray'),
      secondary: getColor('white'),
    },

    isFocused: {
      borderColor: {
        primary: getColor('minsk'),
        secondary: getColor('monaLisa'),
      },
    },
  },
}
