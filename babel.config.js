module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'styled-components',
    'import-graphql',
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    ],
  ],
}
