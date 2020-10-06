module.exports = {
  transformer: {
    getTransformOptions: async () => {
      return {
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }
    },
  },
}
