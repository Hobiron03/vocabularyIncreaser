import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import logo from "../../images/W.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import apiServer from "../../APIServerLocation";

const Home = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isSignupError, setIsSignupError] = useState<boolean>(false);

  const [isLoading, setIsloading] = useState<boolean>(false);

  //ログインは、ローカルストレージにjwtトークンが入っているか確認。入っていればGETリクエストを流してOKだったらisAuthenticatedをtrue。ない場合はそのままHomeを表示
  //GETしてダメだったらそのまま
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios
        .get(apiServer + "validation", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
          },
        })
        .then((response) => {
          history.push("/mypage");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, []);

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsloading(true);

    let form_data = new FormData();
    form_data.append("username", userName);
    form_data.append("password", password);
    axios
      .post(apiServer + "signin", form_data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const jwt = response.data.token;
        localStorage.setItem("jwt", jwt);
        history.push("/mypage");
      })
      .catch((error) => {
        setIsloading(false);
        setIsError(true);
        console.log(error);
      });
  };

  const signup = (e): void => {
    setIsloading(true);

    let form_data: FormData = new FormData();
    form_data.append("username", userName);
    form_data.append("password", password);
    axios
      .post(apiServer + "signup", form_data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        login(e);
      })
      .catch((error) => {
        setIsloading(false);
        setIsSignupError(true);
        console.log(error);
      });
  };

  const handleChangeUserName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const loginError = () => {
    if (isError) {
      return (
        <p className="failed-login">
          ログインに失敗しました。もう一度やり直してください。
        </p>
      );
    } else {
      return <p style={{ fontWeight: "bold" }}>ログイン</p>;
    }
  };

  const signupError = () => {
    if (isSignupError) {
      return (
        <p className="failed-login">
          新規登録に失敗しました。もう一度やり直してください
        </p>
      );
    } else {
      return <p style={{ fontWeight: "bold" }}>新規登録</p>;
    }
  };

  const cardUnderContent = () => {
    if (isLoading) {
      return <CircularProgress />;
    } else {
      return (
        <div>
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
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeUserName(e)}
            />
            <TextField
              id="outlined-basic"
              label="合言葉"
              variant="outlined"
              type="password"
              size="small"
              style={{ marginTop: 8 }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangePassword(e)}
            />
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              endIcon={<ExitToAppIcon></ExitToAppIcon>}
              onClick={(e) => login(e)}
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
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeUserName(e)}
            />
            <TextField
              id="outlined-basic"
              label="合言葉"
              variant="outlined"
              size="small"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangePassword(e)}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<ExitToAppIcon></ExitToAppIcon>}
              onClick={(e) => signup(e)}
            >
              <span style={{ fontSize: "bold" }}>新規登録</span>
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header__left">
          <img src={logo} alt="アイコン" width="25px" height="25px" />
          <p>ことばあつめ</p>
        </div>
        <div className="home__header__right">
          <div className="button">
            <p>ログイン/新規登録</p>
          </div>
        </div>
      </div>

      <div className="home__content">
        <div className="home__content__topic">
          <h1>知らない言葉との出会いを楽しもう</h1>
          <p className="home__content__topic__desc">
            知らないことは恥ずかしいことではない、自分を高めるチャンスだ
          </p>
          <div className="button">
            <p>はじめる</p>
          </div>
        </div>

        <div className="home__content__save-card">
          <h1>知らない言葉との出会いを楽しもう</h1>
          <p className="home__content__topic__desc">
            知らないことは恥ずかしいことではない、自分を高めるチャンスだ
          </p>
          <div className="button">
            <p>はじめる</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default Home;
