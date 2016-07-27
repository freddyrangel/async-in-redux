import { combineReducers } from 'redux';
import catCountReducer     from './cat-count-reducer';

export default combineReducers({
  catCount: catCountReducer
});
