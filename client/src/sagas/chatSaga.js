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
     console.log("message: " + action.text + ' '+ action.messageId +' ' + action.messageTimeStamp);
    yield socket.emit('sendChat', { chatMsg: action.text, timeStamp: action.messageTimeStamp, messageId: action.messageId });
}

function* chatSaga() {
    return yield [
        takeEvery("SEND_MESSAGE1", sendMessage)
    ];

}

export default chatSaga;