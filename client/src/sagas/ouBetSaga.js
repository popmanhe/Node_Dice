import 'babel-polyfill';
import { socketEmit } from '../utils/diceSocketHelper';
//import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";

function* getCoinNames() {
    yield socketEmit('coinNames', {});
}
function* Roll(action) {
    yield socketEmit('roll', action.bet);
}

function* ouSaga() {
    return yield [
        takeEvery("GET_COINNAMES", getCoinNames),
        takeEvery("ROLL", Roll)
    ];

}

export default ouSaga;