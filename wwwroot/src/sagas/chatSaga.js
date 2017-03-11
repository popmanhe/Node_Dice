import io from "socket.io-client";
//import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";
import config from "../config";

const socket = io.connect(config.socketUrl,
    {
        transports: ['websocket']
    }
);
function* sendMessage() {
   yield socket.emit('sendChat', { chatMsg: this.enterMsg() });
}

function* ouBetSaga() {
    return yield [
        takeEvery("sendChat", sendMessage)
    ];

}

export default ouBetSaga;