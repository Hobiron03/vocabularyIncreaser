import { combineReducers } from 'redux';
import words from './words';
import currentGenre from './currentGenre';
import searchWord from './searchWord';

export default combineReducers({ words, currentGenre, searchWord });