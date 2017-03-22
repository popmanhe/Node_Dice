import 'babel-polyfill';
import socket from '../utils/socketIoHelper';

//import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";

function* sendMessage(action) {
   yield socket.emit('sendChat', { message: action.message});
}

function* chatSaga() {
    return yield [
        takeEvery("SEND_MESSAGE", sendMessage)
    ];

}

export default chatSaga;