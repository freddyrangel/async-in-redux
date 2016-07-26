import { combineReducers } from 'redux';
import catCountReducer     from 'containers/counter/reducer';

export default combineReducers({
  catCount: catCountReducer
});
