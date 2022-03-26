import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있다. 
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import User from './modules/user';
import Room from './modules/room';
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  room: Room,
  user: User,
  router: connectRouter(history),
});

const middleWares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === 'development') {
  const { logger } = require('redux-logger');
  middleWares.push(logger);
}

//reducer를 모아 하나의 reducer로 관리 할 수 있게 해준다 
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize…
      })
    : compose;

const enhancer = env==='production'
? compose(
  applyMiddleware(...middleWares)
)
: composeEnhancers(
  applyMiddleware(...middleWares)
)
// const enhancer = composeEnhancers(applyMiddleware(…middleWares));

let store = (initialStore) => createStore(rootReducer, enhancer);
export default store();