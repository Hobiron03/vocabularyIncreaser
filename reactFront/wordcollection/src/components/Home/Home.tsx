import React, { useState, useEffect } from 'react';
import './Home.css';

import {
  useHistory,
} from "react-router-dom";
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import apiServer from '../../APIServerLocation';


const Home = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isSignupError, setIsSignupError] = useState<boolean>(false);

  //ログインは、ローカルストレージにjwtトークンが入っているか確認。入っていればGETリクエストを流してOKだったらisAuthenticatedをtrue。ない場合はそのままHomeを表示
  //GETしてダメだったらそのまま
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      axios.get(apiServer + 'api/validation/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${jwt}`
        },
      })
        .then(response => {
          history.push("/mypage");
        })
        .catch(error => {
          console.log(error);
        })
    }
    // eslint-disable-next-line
  }, []);

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    let form_data: FormData = new FormData();
    form_data.append('username', userName);
    form_data.append('password', password);
    axios.post(apiServer + 'api-auth/', form_data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        const jwt = response.data.token;
        localStorage.setItem('jwt', jwt);
        history.push("/mypage");
      })
      .catch(error => {
        setIsError(true);
        console.log(error);
      })
  };

  const signup = (e) => {
    let form_data: FormData = new FormData();
    form_data.append('username', userName);
    form_data.append('password', password);
    axios.post(apiServer + 'api/signup/', form_data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.data === 201) {
          login(e);
        };
      })
      .catch(error => {
        setIsSignupError(true);
        console.log(error);
      })
  };


  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  };

  const loginError = () => {
    if (isError) {
      return (<p className="failed-login">ログインに失敗しました。もう一度やり直してください。</p>)
    }
    else {
      return <p style={{ fontWeight: "bold" }}>ログイン</p>
    }
  };

  const signupError = () => {
    if (isSignupError) {
      return (<p className="failed-login">新規登録に失敗しました。もう一度やり直してください</p>)
    } else {
      return <p style={{ fontWeight: "bold" }}>新規登録</p>
    }
  };

  return (
    <div className="home">
      <div className="topic">
        <h1 className="title">ことばあつめ</h1>
        <h2 className="subtitle">知らない言葉を集めて知識を増やそう</h2>
      </div>
      <div className="under-home">
        <div className="login-form">
          {loginError()}
          <TextField
            id="outlined-basic"
            label="ユーザーネーム"
            variant="outlined"
            size="small"
            style={{
              marginTop: 8,
              color: "white",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeUserName(e)}
          />
          <TextField
            id="outlined-basic"
            label="パスワード"
            variant="outlined"
            type="password"
            size="small"
            style={{ marginTop: 8 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangePassword(e)}
          />
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            endIcon={<ExitToAppIcon></ExitToAppIcon>}
            onClick={e => login(e)}
          >
            <span style={{ fontSize: "bold" }}>ログイン</span>
          </Button>
        </div>
        <div className="signup-form">
          {signupError()}
          <TextField
            id="outlined-basic"
            label="ユーザーネーム"
            variant="outlined"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeUserName(e)}
          />
          <TextField
            id="outlined-basic"
            label="パスワード"
            variant="outlined"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangePassword(e)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<ExitToAppIcon></ExitToAppIcon>}
            onClick={e => signup(e)}
          >
            <span style={{ fontSize: "bold" }}>新規登録</span>
          </Button>
        </div>
      </div>
    </div>
  )
};


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);


export default Home;
