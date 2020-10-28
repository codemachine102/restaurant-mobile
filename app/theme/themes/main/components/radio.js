import { getColor } from '../../../helpers'

export default {
  outerCircle: {
    bg: {
      primary: getColor('night100'),
    },
  },

  innerCircle: {
    bg: {
      primary: getColor('night50'),
    },

    borderColor: {
      primary: getColor('night50'),
    },
  },

  isChecked: {
    innerCircle: {
      bg: {
        primary: getColor('persimmon100'),
      },

      borderColor: {
        primary: getColor('persimmon100'),
      },
    },
  },

  isPressed: {
    innerCircle: {
      bg: {
        primary: getColor('persimmon75'),
      },

      borderColor: {
        primary: getColor('persimmon75'),
      },
    },
  },
}
