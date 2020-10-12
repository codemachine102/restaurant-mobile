import PickingService from 'services/picking'

const group = PickingService.forPlatform({
  ios: {
    sfProDisplay: 'SF Pro Display',
    bfast: 'Bfast',
  },
  android: {
    sfProDisplay: 'SF-Pro-Display',
    bfast: 'Bfast',
  },
})

const separator = PickingService.forPlatform({
  ios: {
    [group.sfProDisplay]: ' ',
    [group.bfast]: ' ',
  },
  android: {
    [group.sfProDisplay]: '-',
    [group.bfast]: '-',
  },
})

const style = {
  black: 'Black',
  blackItalic: 'BlackItalic',
  bold: 'Bold',
  boldItalic: 'BoldItalic',
  extraLight: 'ExtraLight',
  extraLightItalic: 'ExtraLightItalic',
  italic: 'Italic',
  light: 'Light',
  lightItalic: 'LightItalic',
  regular: 'Regular',
  semiBold: 'Semibold',
  semiBoldItalic: 'SemiboldItalic',
}

export default {
  style,
  group,
  separator,
}
