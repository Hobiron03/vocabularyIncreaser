import { combineReducers } from "redux";
import words from "./words";
import currentGenre from "./currentGenre";
import searchWord from "./searchWord";
import filterColor from "./filterColor";
import experiencePoint from "./experiencePoint";

export default combineReducers({
  words,
  currentGenre,
  searchWord,
  filterColor,
  experiencePoint,
});
