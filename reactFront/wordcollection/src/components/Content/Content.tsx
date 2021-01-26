import React, { useEffect, useState, useContext } from "react";
import "./Content.css";
import Card from "../Card/Card";
import AppContext from "../../contexts/AppContext";
import {
  ADD_NEW_WORD,
  SET_CURRENT_GENRE,
  DELETE_ALL_WORD,
} from "../../actions";

import { useHistory } from "react-router-dom";

import axios from "axios";
import apiServer from "../../APIServerLocation";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

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
        .get(apiServer + "api/validation/", {
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

  //Fetch my word data from http://127.0.0.1:8000/api/myword/
  // ここをPOSTにする。usernameを飛ばす
  useEffect(() => {
    initState();
    const fetchMyWordData = async () => {
      const jwt = localStorage.getItem("jwt");
      await axios
        .get(apiServer + "/fetchmyword/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
          },
        })
        .then((response) => {
          response.data.forEach((wordData) => {
            const word = wordData.fields;
            word.id = wordData.pk;
            dispatch({
              type: ADD_NEW_WORD,
              word,
            });
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMyWordData();
    // eslint-disable-next-line
  }, []);

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
          <p>{state.words.length} words</p>
          <Fade in={!isLoading} {...(!isLoading ? { timeout: 600 } : {})}>
            <div className="word-list">
              {state.words.map((data: wordData, index: number):
                | JSX.Element
                | undefined => {
                if (data.word.includes(state.searchWord)) {
                  return <Card key={index} wordData={data}></Card>;
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
