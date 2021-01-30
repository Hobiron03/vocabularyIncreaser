import { SET_LEVEL } from "../actions/index";

interface levelAction {
  type: string;
  level: number;
}

const level = (state: number = 0, action): number => {
  switch (action.type) {
    case SET_LEVEL:
      const newState = action.level;
      return newState;

    default:
      return state;
  }
};

export default level;
