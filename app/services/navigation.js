import { createRef } from 'react'

const navigationRef = createRef()
const isReadyRef = createRef()

const dispatch = (action) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(action)
  }
}

export default {
  navigationRef,
  isReadyRef,
  dispatch,
}
