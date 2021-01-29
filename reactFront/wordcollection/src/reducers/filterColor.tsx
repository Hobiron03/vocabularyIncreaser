import { FILTER_BY_COLOR } from "../actions/index";

interface filterColor {
  filterColor: string;
}

const filterColor = (state = "", action) => {
  switch (action.type) {
    case FILTER_BY_COLOR:
      return action.filterColor;
    default:
      return state;
  }
};

export default filterColor;
