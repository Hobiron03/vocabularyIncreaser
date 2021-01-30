import React, { useContext, useState } from "react";
import "./Topic.css";
import AppContext from "../../contexts/AppContext";
import { FILTER_BY_COLOR } from "../../actions/index";
import LevelUpBar from "../LevelUpBar/LevelUpBar";

interface filterColor {
  filterColor: string;
}

enum COLORS {
  WATERBLUE = "#69BFF5",
  ORANGE = "#F8AF06",
  PINK = "#E68383",
  NAVIBLUE = "#6979F5",
  GREEN = "#59D67F",
  PURPLE = "#B263E3",
}

//todo: color選択でカードの絞り込み
const Topic = () => {
  const { dispatch } = useContext(AppContext);
  const [filterColor, setFilterColor] = useState("");
  const handleFilterColorClick = (color: string) => {
    dispatch({
      type: FILTER_BY_COLOR,
      filterColor: color,
    });
    setFilterColor(color);
    // console.log(filterColor);
  };

  return (
    <div>
      <LevelUpBar></LevelUpBar>
      <div className="topic-top">
        <h3>一覧</h3>
        <div className="filter-colors">
          <div
            className={["non-filter-color", COLORS.WATERBLUE].join(" ")}
            onClick={() => handleFilterColorClick("")}
          ></div>
          <div
            className={["filter-color", COLORS.WATERBLUE].join(" ")}
            style={{
              backgroundColor: COLORS.WATERBLUE,
            }}
            onClick={() => handleFilterColorClick(COLORS.WATERBLUE)}
          ></div>
          <div
            className={["filter-color", COLORS.ORANGE].join(" ")}
            style={{
              backgroundColor: COLORS.ORANGE,
            }}
            onClick={() => handleFilterColorClick(COLORS.ORANGE)}
          ></div>
          <div
            className={["filter-color", COLORS.PINK].join(" ")}
            style={{
              backgroundColor: COLORS.PINK,
            }}
            onClick={() => handleFilterColorClick(COLORS.PINK)}
          ></div>
          <div
            className={["filter-color", COLORS.NAVIBLUE].join(" ")}
            style={{
              backgroundColor: COLORS.NAVIBLUE,
            }}
            onClick={() => handleFilterColorClick(COLORS.NAVIBLUE)}
          ></div>
          <div
            className={["filter-color", COLORS.GREEN].join(" ")}
            style={{
              backgroundColor: COLORS.GREEN,
            }}
            onClick={() => handleFilterColorClick(COLORS.GREEN)}
          ></div>
          <div
            className={["filter-color", COLORS.PURPLE].join(" ")}
            style={{
              backgroundColor: COLORS.PURPLE,
            }}
            onClick={() => handleFilterColorClick(COLORS.PURPLE)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
