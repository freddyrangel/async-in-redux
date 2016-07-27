import { combineReducers } from 'redux';
import catCountReducer     from './cat-count-reducer';
import catDataReducer      from './cat-data-reducer';

export default combineReducers({
  catCount : catCountReducer,
  catData  : catDataReducer
});
