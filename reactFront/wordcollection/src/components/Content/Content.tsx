import React, { useEffect, useState, useContext } from 'react';
import './Content.css';
import Card from '../Card/Card';
import AppContext from '../../contexts/AppContext';
import {
  ADD_NEW_WORD,
  SET_CURRENT_GENRE,
} from '../../actions';

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

const Content = () => {

  const { state, dispatch } = useContext(AppContext);

  const [myWordList, setMyWordList] = useState<wordData[]>(
    [
      {
        id: 0,
        user_id: 0,
        word: "初めまして",
        mean: "言葉集めへようこそ",
        pronounce: "ハロー",
        genre: "英語",
        color: "",
      },
    ]
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dummyData: wordData[] = [
    {
      id: 1,
      user_id: 1,
      word: "Hello",
      mean: "こんにちは",
      pronounce: "ハロー",
      genre: "英語",
      color: "",
    },
    {
      id: 2,
      user_id: 1,
      word: "罹患する",
      mean: "「罹患」とは「病気にかかること」を意味する単語で、「罹患者」や「罹患率」という表現でよく用いられます",
      pronounce: "りかんする",
      genre: "漢字",
      color: COLORS.NAVIBLUE,
    },
    {
      id: 3,
      user_id: 1,
      word: "怒れる拳笑顔に当たらず",
      mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
      pronounce: "",
      genre: "",
      color: COLORS.PINK,
    },
    {
      id: 4,
      user_id: 2,
      word: "２番だょ",
      mean: "user_id: 2のデータ",
      pronounce: "",
      genre: "漢字",
      color: COLORS.ORANGE,
    },
    {
      id: 5,
      user_id: 2,
      word: "怒れる拳笑顔に当たらず",
      mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
      pronounce: "",
      genre: "",
      color: COLORS.GREEN,
    },
    {
      id: 4,
      user_id: 1,
      word: "２番だょ",
      mean: "user_id: 2のデータ",
      pronounce: "",
      genre: "漢字",
      color: COLORS.ORANGE,
    },
    {
      id: 5,
      user_id: 1,
      word: "怒れる拳笑顔に当たらず",
      mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
      pronounce: "",
      genre: "",
      color: COLORS.GREEN,
    },
    {
      id: 5,
      user_id: 1,
      word: "怒れる拳笑顔に当たらず",
      mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
      pronounce: "",
      genre: "",
      color: COLORS.GREEN,
    },
  ]

  //Fetch data from http://127.0.0.1:8000/api/word/
  useEffect(() => {
    const fetchWordData = async () => {
      await axios.get('http://127.0.0.1:8000/api/word/', {

      }).then(response => {
        const currentWordData: wordData[] = myWordList;
        response.data.forEach((word: wordData) => {
          dispatch({
            type: ADD_NEW_WORD,
            word,
          });
        });
        setMyWordList(currentWordData);
        setIsLoading(false);

      }).catch(error => {
        console.log(error);
      });

    };
    fetchWordData();
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
          <Fade
            in={!isLoading}
            {...(!isLoading ? { timeout: 600 } : {})}
          >
            <div className="word-list">
              {
                state.words.map((data: wordData, index: number) => {
                  if (state.currentGenre[0] === data.genre || state.currentGenre[0] === 'ALL')
                    return <Card key={index} word={data.word} mean={data.mean} color={data.color}></Card>
                })
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

  return (
    <div className="content">
      {renderWordList()}
      <button onClick={() => {
        narrowDownENG();
      }}>絞り込み英語</button>
      <button onClick={() => {
        narrowDownAll();
      }}>全て</button>
    </div>
  )
};

export default Content
