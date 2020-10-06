import React, { createContext, useContext } from 'react'
import PT from 'prop-types'

const AppContext = createContext({
  viewer: null,
})

export const AppProvider = ({ children, ...value }) => {
  return <AppContext.Provider {...{ value }}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PT.node.isRequired,
}

export const useApp = () => {
  return useContext(AppContext)
}
