import { all, fork, setContext } from 'redux-saga/effects'

import sessionSaga from './session'

export default function* rootSaga(client) {
  yield setContext({ client })

  yield all([fork(sessionSaga)])
}
