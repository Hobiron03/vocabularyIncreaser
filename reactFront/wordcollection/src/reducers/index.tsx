import { combineReducers } from 'redux';
import words from './words';
import currentGenre from './currentGenre';

export default combineReducers({ words, currentGenre });