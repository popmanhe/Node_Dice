import { put } from 'redux-saga/effects';
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:51690/api/' : '/api/';
const getSessionIdApi = 'session/getsessionid';
const initSessionIdApi = 'session/createsessionid';

const sagaUtil = {

  initializeSession: function* (data) {
    yield put({ type: 'LOADING', val: 1 });
    try {
      const [resp] = yield Promise.all([sagaUtil.get(baseUrl + getSessionIdApi).then((r) => r.json())]);
      if (!resp.sessionId) {
        yield Promise.all([sagaUtil.post(baseUrl + initSessionIdApi, null)]);
      }
      yield put({ type: 'CONTINUE_INITIALIZE_API', data });
    } catch (e) {
      console.log('API call failed in initialization session');
      console.log('Exception Detail: ' + e);
      yield put({ type: 'API_EXCEPTION', e });
    }
    finally {
      //hide loading icon
      yield put({ type: 'LOADING', val: -1 });
    }
  },
  get: (url) => {
    console.log('GET request, URL:' + url);
    return fetch(url, {
      method: "GET",
      credentials: 'include',
    });
  },
  post: (url, data) => {
    console.log('Post request, URL:' + url);
    console.log('data: ' + JSON.stringify(data));
    return fetch(url, {
      headers: { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(data),
      credentials: 'include'
    });
  },
  fetch: function* (url, data, success, failed, isText = false) {
    //show loading icon
    yield put({ type: 'LOADING', val: 1 });
    try {
      const sessionRes = yield (sagaUtil.get(baseUrl + getSessionIdApi).then(resp => resp.json()));
      if (sessionRes.sessionId) {
        let promise = yield (data ? sagaUtil.post(baseUrl + url, data) : sagaUtil.get(baseUrl + url))
          .then(resp => isText ? resp.text() : resp.json());
        console.log(promise);
        if (promise && promise.success)
          yield put(success(promise));
        else {
          if (failed)
            yield put(failed(promise));
          else
            yield put({ type: 'ERROR', message: promise && promise.error });
        }
      }
      else {
        console.log('session expired');
        yield put({ type: 'SHOW_SESSION_EXPIRED' });
      }
    } catch (e) {
      console.log('API call failed. URL: ' + url);
      console.log('Exception Detail: ' + e);
      yield put({ type: 'API_EXCEPTION', e });
    }
    finally {
      //hide loading icon
      yield put({ type: 'LOADING', val: -1 });
    }

  }
};
export default sagaUtil;