import { combineReducers } from 'redux';
import words from './words';
import genre from './genre';

export default combineReducers({ words, genre });