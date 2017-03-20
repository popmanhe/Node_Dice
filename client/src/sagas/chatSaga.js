import 'babel-polyfill';
import io from "socket.io-client";
//import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";
import config from "../config";

const socket = io.connect(config.socketUrl,
    {
        transports: ['websocket']
    }
);
function* sendMessage(action) {
   yield socket.emit('sendChat', { message: action.text, timeStamp: action.messageTimeStamp, messageId: action.messageId });
}

function* chatSaga() {
    return yield [
        takeEvery("SEND_MESSAGE", sendMessage)
    ];

}

export default chatSaga;