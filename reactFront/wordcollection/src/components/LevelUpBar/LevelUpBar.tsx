import React, { useState, useContext } from "react";
import { Line } from "rc-progress";
import "./LevelUpBar.css";
import LevelUpModal from "../LevelUpModal/LevelUpModal";
import { SET_EXPERIENCE_POINT } from "../../actions";

import AppContext from "../../contexts/AppContext";

const LevelUpBar = () => {
  const { state, dispatch } = useContext(AppContext);
  const [barNum, setBarNum] = useState(1);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const resetExperiencePoint = () => {
    dispatch({
      type: SET_EXPERIENCE_POINT,
      experiencePoint: 0,
    });
  };

  const toggleModalState = () => {
    setIsLevelUpModalOpen(false);
    resetExperiencePoint();
  };

  const isModalOpen = () => {
    if (state.experiencePoint >= 100) {
      return <LevelUpModal toggleModalState={toggleModalState}></LevelUpModal>;
    }
  };
  return (
    <div className="LevelUpBar">
      <div>
        <h3>Lv. 32</h3>
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
