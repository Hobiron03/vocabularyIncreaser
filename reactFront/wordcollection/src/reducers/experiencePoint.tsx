import { SET_EXPERIENCE_POINT } from "../actions/index";

interface experiencePointAction {
  type: string;
  experiencePoint: number;
}

const experiencePoint = (state: number = 0, action): number => {
  switch (action.type) {
    case SET_EXPERIENCE_POINT:
      const newState = action.experiencePoint;
      return newState;

    default:
      return state;
  }
};

export default experiencePoint;
