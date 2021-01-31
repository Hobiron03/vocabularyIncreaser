import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import logo from "../../images/W.png";
import saveCardImg from "../../images/saveCard.png";
import cardsImg from "../../images/cards.png";

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import Modal from "@material-ui/core/Modal";

import apiServer from "../../APIServerLocation";

const Home = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [signUpModalopen, setSignUpModalopen] = useState(false);

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

  const login = () => {
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

  const signup = (): void => {
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
        login();
      })
      .catch((error) => {
        setIsloading(false);
        setIsSignupError(true);
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSignUpModalClose = () => {
    setSignUpModalopen(false);
  };

  const handleSignUpModalOpen = () => {
    setSignUpModalopen(true);
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
    }
  };

  const signupError = () => {
    if (isSignupError) {
      return (
        <p className="failed-login">
          新規登録に失敗しました。もう一度やり直してください
        </p>
      );
    }
  };

  const loginModalContent = () => {
    if (isLoading) {
      return <CircularProgress />;
    } else {
      return (
        <div className={classes.paper}>
          <h1 className="paper__title">ログイン</h1>
          {loginError()}
          <div className="paper__form">
            <TextField
              id="outlined-basic"
              label="ユーザーネーム"
              variant="outlined"
              size="small"
              style={{
                marginTop: 13,
                color: "white",
                width: "100%",
              }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeUserName(e)}
            />

            <TextField
              id="outlined-basic"
              label="合言葉"
              variant="outlined"
              size="small"
              style={{
                marginTop: 13,
                marginBottom: 20,
                color: "white",
                width: "100%",
              }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangePassword(e)}
            />
          </div>
          <div className="button" onClick={() => login()}>
            <p>ログイン</p>
          </div>
        </div>
      );
    }
  };

  const signUpModalContent = () => {
    if (isLoading) {
      return <CircularProgress />;
    } else {
      return (
        <div className={classes.paper}>
          <h1 className="paper__title">新規登録</h1>
          {signupError()}
          <div className="paper__form">
            <TextField
              id="outlined-basic"
              label="ユーザーネーム"
              variant="outlined"
              size="small"
              style={{
                marginTop: 13,
                color: "white",
                width: "100%",
              }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangeUserName(e)}
            />

            <TextField
              id="outlined-basic"
              label="合言葉"
              variant="outlined"
              size="small"
              style={{
                marginTop: 13,
                marginBottom: 20,
                color: "white",
                width: "100%",
              }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChangePassword(e)}
            />
          </div>
          <div className="button" onClick={() => signup()}>
            <p>新規登録する</p>
          </div>
        </div>
      );
    }
  };

  const handleOpenLoginModal = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          {loginModalContent()}
        </Modal>
      </div>
    );
  };

  const handleOpenSignUpModal = () => {
    return (
      <div>
        <Modal
          open={signUpModalopen}
          onClose={handleSignUpModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          {signUpModalContent()}
        </Modal>
      </div>
    );
  };

  return (
    <div className="home">
      {handleOpenLoginModal()}
      {handleOpenSignUpModal()}
      <div className="home__header">
        <div className="home__header__left">
          <img src={logo} alt="アイコン" width="25px" height="25px" />
          <p>ことばあつめ</p>
        </div>
        <div className="home__header__right">
          <div className="button" onClick={() => handleOpen()}>
            <p>ログイン</p>
          </div>
          <div
            className="button home__header__right__signup"
            onClick={() => handleSignUpModalOpen()}
          >
            <p>新規登録</p>
          </div>
        </div>
      </div>
      <div className="home__content">
        <div className="home__content__topic">
          <h1>知らない言葉との出会いを楽しもう</h1>
          <p className="home__content__topic__desc">
            知らないことは恥ずかしいことではない、自分を高めるチャンスだ
          </p>
          <div className="button" onClick={() => handleSignUpModalOpen()}>
            <p>はじめる</p>
          </div>
        </div>

        <div className="home__content__save-card">
          <img
            src={saveCardImg}
            alt="アイコン"
            className="home__content__save-card__img"
          />
          <h1>言葉をカード形式で保存</h1>
          <p className="home__content__save-card__desc">
            意味や読み方ジャンルなども合わせて保存できます。
          </p>
        </div>

        <div className="home__content__arrange-color">
          <img
            src={cardsImg}
            alt="アイコン"
            className="home__content__arrange-color__img"
          />
          <div className="home__content__arrange-color__arange-card">
            <h1>多彩な色でカードを作成</h1>
            <p className="home__content__arrange-color__desc">
              6色の中から選ぶことができます。
            </p>
          </div>
        </div>

        <div className="home__content__save-card">
          <img
            src={saveCardImg}
            alt="アイコン"
            className="home__content__save-card__img"
          />
          <h1>レベルをあげて称号をGETしよう</h1>
          <p className="home__content__save-card__desc">
            ことばをどんどんあつめて経験値を貯めよう。
          </p>
        </div>

        <div className="home__content__start">
          <div className="home__content__start">
            <h1>さあ、はじめよう！</h1>
            <div className="button" onClick={() => handleSignUpModalOpen()}>
              <p>はじめる</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "1%",
      boxShadow: theme.shadows[5],
      border: `3px solid #087aff`,
      padding: theme.spacing(2, 4, 3),
      width: 450,
      transition: "all 0.2s",
    },
    colorBallet: {
      border: "2px solid #000000",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default Home;
