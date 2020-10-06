import { getColor } from '../../../helpers'

export default {
  container: {
    bg: {
      primary: getColor('minsk'),
      secondary: getColor('white'),
    },

    isPressed: {
      bg: {
        primary: getColor('royalBlue'),
        secondary: getColor('white'),
      },
    },
  },

  title: {
    color: {
      primary: getColor('white'),
      secondary: getColor('minsk'),
    },

    isPressed: {
      color: {
        primary: getColor('white'),
        secondary: getColor('royalBlue'),
      },
    },
  },
}
