src/store/middleware/thunk.js
```
export default ({ dispatch, getState }) => next => action =>  {
  return isFunction(action) ? action(dispatch, getState) : next(action);
}

function isFunction(action) {
  return typeof action === 'function';
}
```

src/store/index.js
```
import { applyMiddleware, createStore } from 'redux';
import logger                           from './middleware/logger';
import thunk                            from './middleware/thunk';
import rootReducer                      from 'reducers';

const middleware = applyMiddleware(logger, thunk)

const store = createStore(rootReducer, middleware);

export default store;
```

src/actions/voting-actions.js
```
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
```

src/reducers/cat-data-reducer.js
```
import {
  FETCH_CAT_DATA_SUCCESS
} from 'constants';

export default function(state = {url: null}, {type, payload}) {
  switch (type) {
    case FETCH_CAT_DATA_SUCCESS:
      return payload;
    default:
      return state;
  }
}
```

src/reducers/index.js
```
import { combineReducers } from 'redux';
import catCountReducer     from './cat-count-reducer';
import catDataReducer      from './cat-data-reducer';

export default combineReducers({
  catCount : catCountReducer,
  catData  : catDataReducer
});
```

src/components/voting/index.js
```
import './index.css';
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import * as actions         from 'actions/voting-actions';

class Voting extends Component {

  componentDidMount() {
    this.props.fetchCatImage();
  }

  render() {
    const { url } = this.props.data;
    return (
      <div className='voting-container'>
        <div className='vote-buttons'>
          <span>See Another?</span>
          <button className='love-it' onClick={this.props.upvote}>Love it</button>
          <button className='hate-it' onClick={this.props.downvote}>Hate it</button>
        </div>
        <div className='cat-image'>
          <img src={url} height='300'/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.catData
  };
}

export default connect(mapStateToProps, actions)(Voting);
```
