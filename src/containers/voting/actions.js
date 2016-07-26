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
