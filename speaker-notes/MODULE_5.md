src/store/index.js
```
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware             from 'redux-saga'
import rootSaga                         from 'sagas'
import logger                           from './middleware/logger';
import rootReducer                      from 'reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(logger, sagaMiddleware)

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
```

src/sagas/index.js
```
import fetch           from 'isomorphic-fetch';
import { takeLatest }  from 'redux-saga'
import { put, select } from 'redux-saga/effects';
import {
  API_KEY,
  FETCH_CAT_DATA_PENDING,
  FETCH_CAT_DATA_SUCCESS,
  FETCH_CAT_DATA_FAILED,
  CAT_VOTE_SUCCESS,
  CAT_VOTE_FAILED,
  UPVOTE,
  DOWNVOTE
} from 'constants';

function* fetchCatImage(action) {

  const params = { api_key: API_KEY };

  try {
    const data = yield fetch('http://thecatapi.com/api/images/get', params);
    yield put({
      type: FETCH_CAT_DATA_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: FETCH_CAT_DATA_FAILED,
      error: true,
      payload: error
    })
  }
}

function* upvote(action) {
  yield* voteCatImage(10);
}

function* downvote(action) {
  yield* voteCatImage(1);
}

function* voteCatImage(score) {

  try {
    const url = yield select((state) => state.catData.url);

    const params = {
      api_key  : API_KEY,
      method   : 'POST',
      mode     : 'no-cors',
      image_id : url,
      score
    };

    const data = yield fetch('http://thecatapi.com/api/images/vote', params);

    yield put({
      type: CAT_VOTE_SUCCESS,
      payload: data
    });

    yield* fetchCatImage();

  } catch (error) {
    yield put({
      type: CAT_VOTE_FAILED,
      error: true,
      payload: error
    })
  }
};

export default function* rootSata() {
  yield [
    takeLatest(FETCH_CAT_DATA_PENDING, fetchCatImage),
    takeLatest(UPVOTE, upvote),
    takeLatest(DOWNVOTE, downvote)
  ];
}
```

src/actions/voting-actions
```
import {
  FETCH_CAT_DATA_PENDING,
  UPVOTE,
  DOWNVOTE
} from 'constants';

export function fetchCatImage() {
  return {
    type: FETCH_CAT_DATA_PENDING
  }
}

export function upvote() {
  return {
    type: UPVOTE
  }
}

export function downvote() {
  return {
    type: DOWNVOTE
  }
}
```

src/constants.js
```
export const API_KEY                = 'MTA0NzM4';
export const INCREMENT_CAT_COUNT    = 'INCREMENT_CAT_COUNT';
export const DECREMENT_CAT_COUNT    = 'DECREMENT_CAT_COUNT';
export const FETCH_CAT_DATA_PENDING = 'FETCH_CAT_DATA_PENDING';
export const FETCH_CAT_DATA_SUCCESS = 'FETCH_CAT_DATA_SUCCESS';
export const FETCH_CAT_DATA_FAILED  = 'FETCH_CAT_DATA_FAILED';
export const CAT_VOTE_PENDING       = 'CAT_VOTE_PENDING';
export const CAT_VOTE_FAILED        = 'CAT_VOTE_FAILED';
export const CAT_VOTE_SUCCESS       = 'CAT_VOTE_SUCCESS'
export const UPVOTE                 = 'UPVOTE';
export const DOWNVOTE               = 'DOWNVOTE';
```
