import React, { useEffect, useState, useContext } from 'react';
import './Content.css';
import Card from '../Card/Card';
import AppContext from '../../contexts/AppContext';
import {
  ADD_NEW_WORD,
  SET_CURRENT_GENRE,
  DELETE_ALL_WORD,
} from '../../actions';

import {
  useHistory,
} from 'react-router-dom';

import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';


enum COLORS {
  WATERBLUE = '#69BFF5',
  ORANGE = '#F8AF06',
  PINK = '#E68383',
  NAVIBLUE = '#6979F5',
  GREEN = '#59D67F',
  PURPLE = '#B263E3',
};

interface wordData {
  id: number;
  user_id: number;
  word: string;
  mean: string;
  pronounce: string;
  genre: string;
  color: string;
};

const Content = (props) => {
  const history = useHistory();

  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [wordNum, setWordNum] = useState<number>(0);


  const initState = () => {
    dispatch({
      type: SET_CURRENT_GENRE,
      currentGenre: 'ALL',
    });

    //ブラウザバックの時に増殖するのを防ぐ
    dispatch({
      type: DELETE_ALL_WORD,
    });
  }

  //リロード時にログイン状態を取得
  useEffect(() => {
    const jwt: string | null = localStorage.getItem('jwt');
    if (jwt) {
      axios.get('http://127.0.0.1:8000/api/validation/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${jwt}`
        },
      }).then(_ => {
        setIsLogin(true);
      }).catch(error => {
        console.log(error);
        history.push("/");
      })
    } else {
      history.push("/");
    }
  }, []);

  //Fetch my word data from http://127.0.0.1:8000/api/myword/
  useEffect(() => {
    initState();
    const fetchMyWordData = async () => {
      const jwt = localStorage.getItem('jwt');
      await axios.get('http://127.0.0.1:8000/api/fetchmyword/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${jwt}`
        },
      })
        .then(response => {
          response.data.forEach((wordData) => {
            console.log(wordData.fields);
            const word = wordData.fields;
            dispatch({
              type: ADD_NEW_WORD,
              word,
            });
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    fetchMyWordData();
  }, []);




  const renderWordList = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <CircularProgress></CircularProgress>
          <p>Now Loading</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <p>{state.words.length} words</p>
          <Fade
            in={!isLoading}
            {...(!isLoading ? { timeout: 600 } : {})}
          >
            <div className="word-list">
              {
                state.words.map((data: wordData, index: number): JSX.Element | undefined => {
                  if (state.currentGenre[0] === data.genre || state.currentGenre[0] === 'ALL')
                    return <Card key={index} word={data.word} mean={data.mean} color={data.color}></Card>
                }
                )
              }
            </div>
          </Fade>
        </div>
      );
    }
  }

  const narrowDownENG = () => {
    dispatch({
      type: SET_CURRENT_GENRE,
      currentGenre: '英語',
    });
  }

  const narrowDownAll = () => {
    dispatch({
      type: SET_CURRENT_GENRE,
      currentGenre: 'ALL',
    });
  }

  const logout = () => {
    localStorage.setItem('jwt', "");
    setIsLogin(false);
    dispatch({
      type: DELETE_ALL_WORD,
    });
    history.push("/");
  }

  return (
    <div className="content">
      {renderWordList()}


      <button onClick={() => {
        narrowDownENG();
      }}>絞り込み英語</button>
      <button onClick={() => {
        narrowDownAll();
      }}>全て</button>

      <button onClick={() => {
        logout();
      }}>ログアウト</button>
    </div>
  )
};

export default Content
