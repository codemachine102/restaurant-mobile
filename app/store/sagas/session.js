import { all, put, select, getContext, takeLatest } from 'redux-saga/effects'

import { selectIsAuthenticated, logOutRequest, logOutSuccess } from 'store/slices/session'

function* logOutSaga() {
  const client = yield getContext('client')
  const isAuthenticated = yield select(selectIsAuthenticated)

  if (!isAuthenticated) {
    return
  }

  yield put(logOutSuccess())

  client.clearStore()
}

export default function* sessionSaga() {
  yield all([takeLatest(logOutRequest, logOutSaga)])
}
