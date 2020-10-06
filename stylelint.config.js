module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-recommended', 'stylelint-config-styled-components'],
  ignoreFiles: ['**/*.(graphql|ttf|txt|json|png|xml)'],
  rules: {
    'block-no-empty': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'aspect-ratio',
          'text-align-vertical',
          'tint-color',
          'padding-vertical',
          'padding-horizontal',
        ],
      },
    ],
  },
}
