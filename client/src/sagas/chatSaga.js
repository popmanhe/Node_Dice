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
   console.log("message: " + action.text);
//   yield socket.emit('sendChat', { chatMsg: this.enterMsg() });
}

function* ouBetSaga() {
    return yield [
        takeEvery("SEND_MESSAGE", sendMessage)
    ];

}

export default ouBetSaga;