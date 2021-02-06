import React, { useContext } from "react";
import { Line } from "rc-progress";
import "./LevelUpBar.css";
import LevelUpModal from "../LevelUpModal/LevelUpModal";
import { SET_EXPERIENCE_POINT, SET_LEVEL } from "../../actions";

import AppContext from "../../contexts/AppContext";

const LevelUpBar = () => {
  const { state, dispatch } = useContext(AppContext);
  const resetExperiencePoint = () => {
    dispatch({
      type: SET_EXPERIENCE_POINT,
      experiencePoint: 0,
    });
  };

  const toggleModalState = () => {
    resetExperiencePoint();
    dispatch({
      type: SET_LEVEL,
      level: state.level + 1,
    });
  };

  // state.experiencePoint >= 100
  const isModalOpen = () => {
    if (state.experiencePoint >= 100) {
      return <LevelUpModal toggleModalState={toggleModalState}></LevelUpModal>;
    }
  };
  return (
    <div className="LevelUpBar">
      <div>
        <h3>Lv. {state.level}</h3>
      </div>
      <div className="levelUpBar__bar">
        <Line
          percent={state.experiencePoint}
          trailWidth={4}
          strokeWidth={0.7}
          strokeColor="#037DE5"
        />
      </div>
      {isModalOpen()}
    </div>
  );
};

export default LevelUpBar;
