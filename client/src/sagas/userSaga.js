import 'babel-polyfill';
import {socketEmit} from '../utils/socketIoHelper';
//import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";

function* loginUser(action) {
   yield socketEmit('loginUser', { message: action.message});
}

function* chatSaga() {
    return yield [
        takeEvery("LOGIN_USER", loginUser)
    ];

}

export default chatSaga;