import React, { useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppContext from '../../contexts/AppContext';
import {
    ADD_NEW_WORD,
} from '../../actions';
import axios from 'axios';
import apiServer from '../../APIServerLocation';
import './AddModal.css';


interface AddModal {
    toggleModalState: Function;
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

enum COLORS {
    WATERBLUE = '#69BFF5',
    ORANGE = '#F8AF06',
    PINK = '#E68383',
    NAVIBLUE = '#6979F5',
    GREEN = '#59D67F',
    PURPLE = '#B263E3',
};

const AddModal = (props: AddModal) => {
    const { state, dispatch } = useContext(AppContext);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            paper: {
                backgroundColor: theme.palette.background.paper,
                borderRadius: "1%",
                boxShadow: theme.shadows[5],
                border: `5px solid ${color}`,
                padding: theme.spacing(2, 4, 3),
                width: 450,
                transition: "all 0.2s"
            },
            colorBallet: {
                border: "3px solid #000000",
            }
        }),
    );

    const [color, setColor] = useState<string>("#69BFF5");
    const [word, setWord] = useState<string>("");
    const [pronounce, setPronounce] = useState<string>("");
    const [mean, setMean] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const addWord: wordData = {
        id: 0,
        user_id: 0,
        word: "",
        pronounce: "",
        mean: "",
        genre: "",
        color: "",
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.toggleModalState();
    };

    const clickColor = (color: string) => {
        setColor(color);
    };

    const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWord(e.target.value);
    };

    const handleChangeMean = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMean(e.target.value);
    };

    const handleChangePronounce = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPronounce(e.target.value);
    };

    const handleChangeGenre = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGenre(e.target.value);
    };

    const handleAddButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let form_data: FormData = new FormData();
        form_data.append('word', word);
        form_data.append('pronounce', pronounce);
        form_data.append('mean', mean);
        form_data.append('genre', genre);
        form_data.append('color', color);

        const jwt = localStorage.getItem('jwt');
        axios.post(apiServer + 'api/addmyword/', form_data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${jwt}`
            },
        })
            .then(_ => {
                addWord.id = state.words.length + 1;
                addWord.user_id = state.words[0].user_id;
                addWord.word = word;
                addWord.pronounce = pronounce;
                addWord.mean = mean;
                addWord.genre = genre;
                addWord.color = color;

                dispatch({
                    type: ADD_NEW_WORD,
                    word: addWord,
                });

                handleClose();
            })
            .catch((error) => {
                console.log("エラーが発生しました");
            });
    };


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2>言葉を追加しましょう</h2>
                        <form>
                            <div className="form-element">
                                <p>追加することば（必須）</p>
                                <TextField id="outlined-basic" variant="outlined" size="small" fullWidth={true}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeWord(e)}
                                />
                            </div>

                            <div className="form-element">
                                <p>ことばの読み方</p>
                                <TextField id="outlined-basic" variant="outlined" size="small" fullWidth={true}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangePronounce(e)}
                                />
                            </div>

                            <div className="form-element">
                                <p>ことばの意味</p>
                                <TextField id="outlined-basic" variant="outlined" size="small" fullWidth={true} multiline={true}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeMean(e)}
                                />
                            </div>

                            <div className="form-element">
                                <p>ジャンル</p>
                                <TextField id="outlined-basic" variant="outlined" size="small" multiline={true}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeGenre(e)}
                                />
                            </div>

                            <div className="form-element">
                                <p>カラー</p>
                                <div className="color-selections">
                                    <div className={
                                        [
                                            "color",
                                            color === COLORS.WATERBLUE ? classes.colorBallet : ""
                                        ].join(" ")
                                    }
                                        style={{
                                            backgroundColor: COLORS.WATERBLUE,
                                        }}
                                        onClick={() => clickColor(COLORS.WATERBLUE)}
                                    >
                                    </div>
                                    <div className={
                                        [
                                            "color",
                                            color === COLORS.ORANGE ? classes.colorBallet : ""
                                        ].join(" ")
                                    }

                                        style={{
                                            backgroundColor: COLORS.ORANGE,
                                        }}
                                        onClick={() => clickColor(COLORS.ORANGE)}
                                    >
                                    </div>

                                    <div className={
                                        [
                                            "color",
                                            color === COLORS.PINK ? classes.colorBallet : ""
                                        ].join(" ")
                                    }
                                        style={{
                                            backgroundColor: COLORS.PINK,
                                        }}
                                        onClick={() => clickColor(COLORS.PINK)}
                                    >
                                    </div>

                                    <div className={
                                        [
                                            "color",
                                            color === COLORS.NAVIBLUE ? classes.colorBallet : ""
                                        ].join(" ")
                                    }
                                        style={{
                                            backgroundColor: COLORS.NAVIBLUE,
                                        }}
                                        onClick={() => clickColor(COLORS.NAVIBLUE)}
                                    >
                                    </div>

                                    <div className={
                                        [
                                            "color",
                                            color === COLORS.GREEN ? classes.colorBallet : ""
                                        ].join(" ")
                                    }
                                        style={{
                                            backgroundColor: COLORS.GREEN,
                                        }}
                                        onClick={() => clickColor(COLORS.GREEN)}
                                    >
                                    </div>

                                    <div className={
                                        [
                                            "color",
                                            color === COLORS.PURPLE ? classes.colorBallet : ""
                                        ].join(" ")
                                    }
                                        style={{
                                            backgroundColor: COLORS.PURPLE,
                                        }}
                                        onClick={() => clickColor(COLORS.PURPLE)}
                                    >
                                    </div>
                                </div>
                            </div>

                            <Button fullWidth={true}
                                variant="contained"
                                style={{
                                    backgroundColor: color,
                                    marginTop: 30,
                                }}
                                disabled={
                                    word === "" ? true : false
                                }
                                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleAddButtonClick(e)}
                            >
                                <p className="add-button">追加する</p>
                            </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
};

export default AddModal;
