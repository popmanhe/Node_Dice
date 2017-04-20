import 'babel-polyfill';
import {socketEmit} from '../utils/diceSocketHelper';
//import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";

function* sendMessage(action) {
   yield socketEmit('sendChat', { message: action.message});
}

function* chatSaga() {
    return yield [
        takeEvery("SEND_MESSAGE", sendMessage)
    ];

}

export default chatSaga;