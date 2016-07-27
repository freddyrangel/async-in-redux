import fetch       from 'isomorphic-fetch';
import {
  API_KEY,
  FETCH_CAT_DATA_PENDING,
  FETCH_CAT_DATA_SUCCESS,
  FETCH_CAT_DATA_FAILED,
  CAT_VOTE_PENDING,
  CAT_VOTE_SUCCESS,
  CAT_VOTE_FAILED
} from 'constants';

export function fetchCatImage() {
  return function(dispatch, getState) {

    dispatch({ type: FETCH_CAT_DATA_PENDING });

    const params = { api_key: API_KEY };

    fetch('http://thecatapi.com/api/images/get', params)
      .then((data) => {
        dispatch({
          type: FETCH_CAT_DATA_SUCCESS,
          payload: data
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_CAT_DATA_FAILED,
          error: true,
          payload: error
        })
      });
  }
}

export function upvote() {
  return function(dispatch, getState) {
    voteCatImage(dispatch, getState, 10);
  }
}

export function downvote() {
  return function(dispatch, getState) {
    voteCatImage(dispatch, getState, 1);
  }
}

function voteCatImage(dispatch, getState, score) {

  dispatch({type: CAT_VOTE_PENDING});

  const state = getState();
  const url = state.catData.url;

  const params = {
    api_key  : API_KEY,
    method   : 'POST',
    mode     : 'no-cors',
    image_id : url,
    score
  };

  fetch('http://thecatapi.com/api/images/vote', params)
    .then((data) => {
      dispatch({
        type: CAT_VOTE_SUCCESS,
        payload: data
      })
      dispatch(fetchCatImage());
    })
    .catch((error) => {
      dispatch({
        type: CAT_VOTE_FAILED,
        error: true,
        payload: error
      })
    });
};
