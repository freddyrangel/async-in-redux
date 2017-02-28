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
