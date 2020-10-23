import { getColor } from '../../../helpers'

export default {
  innerGradient: {
    bg: {
      color1: {
        primary: getColor('persimmon75'),
      },

      color2: {
        primary: getColor('persimmon100'),
      },
    },
  },

  isOutlined: {
    inner: {
      border: {
        primary: getColor('persimmon100'),
      },
    },

    title: {
      color: {
        primary: getColor('persimmon100'),
      },
    },
  },

  isPressed: {
    inner: {
      bg: {
        primary: getColor('persimmon100'),
      },
    },
  },
}
