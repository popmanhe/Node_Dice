import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import createSocketIoMiddleware from '../utils/redux-socket.io';
import rootReducer from '../reducers';
import config from '../config';
// import sockets from '../sockets';
import io from "socket.io-client";

//import  ouBetSaga  from '../sagas/ouBetSaga';
import rootSaga from '../sagas';
const diceSocketMiddleware = createSocketIoMiddleware(io.connect(config.diceSocketUrl
  , { transports: ['websocket'] }), 'dice');
const raffleSocketMiddleware = createSocketIoMiddleware(io.connect(config.raffleSocketUrl
  , { transports: ['websocket'] }), 'raffle');

function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    // Add other middleware on this line...
    diceSocketMiddleware,
    raffleSocketMiddleware,
    sagaMiddleware
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    // Add other middleware on this line...
    diceSocketMiddleware,
    raffleSocketMiddleware,
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    sagaMiddleware
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);
  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;