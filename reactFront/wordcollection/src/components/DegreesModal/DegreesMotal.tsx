import React, { useState, useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Degree from "./Degree/Degree";
import "./DegreesModal.scss";
import AppContext from "../../contexts/AppContext";

interface LelevUpModalProps {
  toggleModalState: Function;
}

const LevelUpModal = (props: LelevUpModalProps) => {
  const { state } = useContext(AppContext);

  const [open, setOpen] = useState(true);

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
        width: 420,
        transition: "all 0.2s",
      },
      colorBallet: {
        border: "2px solid #000000",
      },
    })
  );
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    props.toggleModalState();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 className="paper__degree">獲得した称号一覧</h1>
            <div className="paper__degree__degrees">
              <Degree
                currentLevel={state.level}
                degreeLevel={1}
                degree="名もなき者"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={2}
                degree="かけ出し冒険者"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={4}
                degree="勉強熱心"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={5}
                degree="ことばマニア"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={7}
                degree="世界一のボキャブラリー"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={9}
                degree="言語学者"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={11}
                degree="創生者"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={13}
                degree="名を冠する者"
              ></Degree>
              <Degree
                currentLevel={state.level}
                degreeLevel={15}
                degree="神"
              ></Degree>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default LevelUpModal;
