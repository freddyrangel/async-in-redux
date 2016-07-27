
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
