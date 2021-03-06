import React, { useEffect, useState, useContext } from "react";
import "./Content.css";
import Card from "../Card/Card";
import AppContext from "../../contexts/AppContext";
import {
  ADD_NEW_WORD,
  SET_CURRENT_GENRE,
  DELETE_ALL_WORD,
  SET_LEVEL,
  SET_EXPERIENCE_POINT,
} from "../../actions";

import { useHistory } from "react-router-dom";

import axios from "axios";
import apiServer from "../../APIServerLocation";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import decodeJWT from "../../decode-jwt";

interface wordData {
  id: number;
  user_id: number;
  word: string;
  mean: string;
  pronounce: string;
  genre: string;
  color: string;
}

const Content = (props) => {
  const history = useHistory();

  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initState = () => {
    dispatch({
      type: SET_CURRENT_GENRE,
      currentGenre: "ALL",
    });

    //ブラウザバックの時に増殖するのを防ぐ
    dispatch({
      type: DELETE_ALL_WORD,
    });
  };

  //リロード時にログイン状態を取得
  useEffect(() => {
    const jwt: string | null = localStorage.getItem("jwt");
    if (jwt) {
      axios
        .get(apiServer + "validation", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
          },
        })
        .then((_) => {})
        .catch((error) => {
          console.log(error);
          history.push("/");
        });
    } else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initState();
    const fetchMyWordData = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        const decodedJWT = decodeJWT(jwt);
        const username = decodedJWT["username"];
        let form_data: FormData = new FormData();
        form_data.append("username", username);

        await axios
          .post(apiServer + "fetchmyword", form_data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${jwt}`,
            },
          })
          .then((response) => {
            if (response.data != null) {
              response.data.forEach((wordData) => {
                const word = wordData;
                word.id = wordData.id;
                dispatch({
                  type: ADD_NEW_WORD,
                  word,
                });
              });
              calcCurrentLevel(response.data.length);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    fetchMyWordData();
    // eslint-disable-next-line
  }, []);

  const calcCurrentLevel = (wordNum) => {
    if (wordNum === undefined) {
      return;
    }
    console.log("wordNum");
    console.log(wordNum);
    const currentLevel = Math.floor(wordNum / 4) + 1;
    const currentExperiencePoint = (wordNum % 4) * 25;

    dispatch({
      type: SET_EXPERIENCE_POINT,
      experiencePoint: currentExperiencePoint,
    });

    dispatch({
      type: SET_LEVEL,
      level: currentLevel,
    });
  };

  const renderWordList = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <CircularProgress></CircularProgress>
          <p>Now Loading</p>
        </div>
      );
    } else {
      return (
        <div>
          {/* <h3>一覧： </h3> */}
          <p>{state.words.length} words</p>
          <Fade in={!isLoading} {...(!isLoading ? { timeout: 600 } : {})}>
            <div className="word-list">
              {state.words.map((data: wordData, index: number):
                | JSX.Element
                | undefined => {
                //searchWordに何も含まれていなければ全て返す
                if (data.word.includes(state.searchWord)) {
                  //この中で色でフィルターする処理を記述する

                  if (state.filterColor) {
                    if (
                      data.color === state.filterColor &&
                      state.filterColor !== ""
                    ) {
                      return <Card key={index} wordData={data}></Card>;
                    }
                  } else {
                    return <Card key={index} wordData={data}></Card>;
                  }
                }
                return undefined;
              })}
            </div>
          </Fade>
        </div>
      );
    }
  };
  return <div className="content">{renderWordList()}</div>;
};

export default Content;
