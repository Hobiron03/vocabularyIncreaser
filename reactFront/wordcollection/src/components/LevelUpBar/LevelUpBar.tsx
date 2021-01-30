import React, { useState } from "react";
import { Line } from "rc-progress";
import "./LevelUpBar.css";
import LevelUpModal from "../LevelUpModal/LevelUpModal";

const LevelUpBar = () => {
  const [barNum, setBarNum] = useState(1);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(true);

  const handleBarIncrease = () => {
    setBarNum(barNum + 25);
    console.log(barNum);
    if (barNum >= 75) {
      setIsLevelUpModalOpen(true);
      setTimeout(() => setBarNum(0), 200);
    }
  };
  const toggleModalState = () => {
    // setIsDescModalOpen(false);
    setIsLevelUpModalOpen(false);
  };

  const isModalOpen = () => {
    if (isLevelUpModalOpen) {
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
          percent={barNum}
          trailWidth={4}
          strokeWidth={0.7}
          strokeColor="#037DE5"
        />
      </div>
      <div>
        <button onClick={() => handleBarIncrease()}>push</button>
      </div>
      {isModalOpen()}
    </div>
  );
};

export default LevelUpBar;
