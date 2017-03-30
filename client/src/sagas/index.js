import { fork } from 'redux-saga/effects';
import chatSaga from './chatSaga';
import userSaga from './userSaga';
export default function* root() {
    yield [
        fork(chatSaga),
        fork(userSaga)

    ];
}