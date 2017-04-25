import { fork } from 'redux-saga/effects';
import notification from './notificationSaga';

export default function* root() {
    yield [
        fork(notification)
    ];
}