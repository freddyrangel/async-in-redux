import {
  INCREMENT_CAT_COUNT,
  DECREMENT_CAT_COUNT
} from 'constants';

export function incrementCatCount() {
  return {
    type: INCREMENT_CAT_COUNT
  }
}

export function decrementCatCount() {
  return {
    type: DECREMENT_CAT_COUNT
  }
}
