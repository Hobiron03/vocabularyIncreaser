import { combineReducers } from "redux";
import words from "./words";
import currentGenre from "./currentGenre";
import searchWord from "./searchWord";
import filterColor from "./filterColor";
import experiencePoint from "./experiencePoint";
import level from "./level";

export default combineReducers({
  words,
  currentGenre,
  searchWord,
  filterColor,
  experiencePoint,
  level,
});
