import React from "react";
import "./Degree.scss";

interface DegreeProps {
  currentLevel: number;
  degreeLevel: number;
  degree: string;
}

const Degree = (props: DegreeProps) => {
  if (props.degreeLevel > props.currentLevel) {
    return (
      <div className="degree">
        <h2>Lv. {props.degreeLevel}: ？？？？？？？？？</h2>
      </div>
    );
  } else {
    return (
      <div className="degree">
        <h2>
          Lv. {props.degreeLevel}: {props.degree}
        </h2>
      </div>
    );
  }
};

export default Degree;
