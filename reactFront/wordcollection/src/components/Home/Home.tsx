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


const Home = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);

  //ログインは、ローカルストレージにjwtトークンが入っているか確認。入っていればGETリクエストを流してOKだったらisAuthenticatedをtrue。ない場合はそのままHomeをひょうじ
  //GETしてダメだったらそのまま
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      axios.get('http://127.0.0.1:8000/api/validation/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${jwt}`
        },
      })
        .then(function (response) {
          history.push("/mypage");
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }, []);

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    let form_data: FormData = new FormData();
    form_data.append('username', userName);
    form_data.append('password', password);
    axios.post('http://127.0.0.1:8000/api-auth/', form_data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(function (response) {
        console.log(response.data.token);
        const jwt = response.data.token;
        localStorage.setItem('jwt', jwt);
        history.push("/mypage");
      })
      .catch(function (error) {
        setIsError(true);
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
      return <p>ログイン</p>
    }
  };

  return (
    <div>
      <h1>This is Home</h1>
      <div className="login-form">
        {loginError()}
        <TextField
          id="outlined-basic"
          label="ユーザーネーム"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeUserName(e)}
        />
        <TextField
          id="outlined-basic"
          label="パスワード"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangePassword(e)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<ExitToAppIcon></ExitToAppIcon>}
          onClick={e => login(e)}
        >
          <span style={{ fontSize: "bold" }}>ログイン</span>
        </Button>
      </div>
      <p>新規登録</p>
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
