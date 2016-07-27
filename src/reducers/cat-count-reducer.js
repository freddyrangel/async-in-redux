import {
  INCREMENT_CAT_COUNT,
  DECREMENT_CAT_COUNT
} from 'constants';

export default function(state = 0, {type, payload}) {
  switch (type) {
    case INCREMENT_CAT_COUNT:
      return state + 1;
    case DECREMENT_CAT_COUNT:
      return state - 1;
    default:
      return state;
  }
}
