import PT from 'prop-types'

export { ViewPropTypes } from 'react-native'

export const FinalFormPropTypes = {
  input: PT.shape({
    onChange: PT.func.isRequired,
  }),
  meta: PT.shape({
    error: PT.oneOfType([PT.string, PT.array]),
    touched: PT.bool.isRequired,
  }),
}

export const ReactNavigationPropTypes = {
  navigation: PT.shape({
    dispatch: PT.func.isRequired,
  }),
  route: PT.shape({
    key: PT.string.isRequired,
    name: PT.string.isRequired,
    params: PT.object,
  }),
  scene: PT.shape({
    descriptor: PT.shape({
      options: PT.object.isRequired,
    }).isRequired,
  }),
}

export const ApolloPropTypes = {
  client: PT.shape({
    resetStore: PT.func.isRequired,
  }),
  query: PT.shape({
    loading: PT.bool,
    refetch: PT.func.isRequired,
  }),
}

export const StyledPropTypes = {
  theme: PT.object,
  variant: PT.oneOfType([PT.string, PT.object]),
}
