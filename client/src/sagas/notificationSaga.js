import * as notifications from '../utils/notifications';
import 'babel-polyfill';
//import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";

function* showErrorMessage(action) {
    if (action.errorCode) {
        switch (action.errorCode) {
            case -1:
                yield notifications.show('Fund not enough', 'Your balance is not enough. Deposit more fund.', 'error');
                break;
            case -2:
            case -3:
                yield notifications.show('Invalid', 'Bet amount is invalid', 'error');
                break;
            case -4:
            case -5:
            case -6:
                yield notifications.show('ERROR', 'Internal error.', 'error');
                break;
            case 11000:
                yield notifications.show('User name exists', 'Choose different one.', 'error');
                break;

        }
    }
    else {
        yield notifications.show(action.title ? action.title : 'ERROR', action.message, 'error');
    }
}

function* showSuccessMessage(action) {
    yield notifications.show(action.title ? action.title : 'SUCCESS', action.message, 'success');
}
function* showInfoMessage(action) {
    yield notifications.show(action.title ? action.title : 'INFO', action.message, 'info');
}
function* showWarningMessage(action) {
    yield notifications.show(action.title ? action.title : 'WARNING', action.message, 'warning');
}
function* showUserNotLoggedinMessage() {
    yield notifications.UserNotLoggedin();
}
function* showUserLoggedinMessage() {
    yield notifications.UserLoggedin();
}
function* notificationSaga() {
    return yield [
        takeEvery("ERROR", showErrorMessage),
        takeEvery("SUCCESS", showSuccessMessage),
        takeEvery("INFO", showInfoMessage),
        takeEvery("WARNING", showWarningMessage),
        takeEvery("USER_NOT_LOGGEDIN", showUserNotLoggedinMessage),
        takeEvery("USER_LOGGEDIN", showUserLoggedinMessage),
    ];

}

export default notificationSaga;