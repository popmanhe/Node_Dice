// import { fork } from 'redux-saga/effects';
// import chatSaga from './chatSaga';
// import userSaga from './userSaga';
// import ouSaga from './ouBetSaga';
export default function* root() {
    yield [
        // fork(chatSaga),
        // fork(userSaga),
        // fork(ouSaga)
    ];
}