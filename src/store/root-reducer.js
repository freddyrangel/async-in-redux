import { combineReducers } from 'redux';
import catCountReducer     from 'containers/counter/reducer';
import catDataReducer      from 'containers/voting/reducer';

export default combineReducers({
  catCount : catCountReducer,
  catData  : catDataReducer
});
