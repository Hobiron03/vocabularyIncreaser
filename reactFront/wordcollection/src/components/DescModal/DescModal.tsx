import React, { useState, useContext, useEffect } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


import AppContext from '../../contexts/AppContext';
import {
    ADD_NEW_WORD,
} from '../../actions';
import axios from 'axios';
import apiServer from '../../APIServerLocation';
import './DescModal.css';


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

interface DescModalProps {
    toggleModalState: Function;
    wordData: wordData;
};

const DescModal = (props: DescModalProps) => {

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

                width: 450,
                transition: "all 0.2s"
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            cardTop: {
                backgroundColor: `${props.wordData.color}`,
                color: "white",
                fontWeight: "bold",
                height: 230,
            },
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
    const [open, setOpen] = useState(true);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.toggleModalState();
        console.log("閉じるよ")
    };

    const clickColor = (color: string) => {
        setColor(color);
    };

    const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length >= 35) {
            return;
        }
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
                addWord.user_id = 0;
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
                console.log(`エラーが発生しました:  ${error}` + error);
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
                        <div className={[
                            "card-top",
                            classes.cardTop
                        ].join(" ")}>
                            <div className="card-top-header">
                                <div className="card-top-header-left">
                                    <h3>{props.wordData.genre}</h3>
                                </div>
                                <div className="card-top-header-right">
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton}
                                        color="inherit"
                                        aria-label="open drawer"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton}
                                        color="inherit"
                                        aria-label="open drawer"
                                    >
                                        <EditIcon color="inherit" />
                                    </IconButton>
                                </div>
                            </div>
                            <div className="card-top-content">
                                <div className="pronunce">
                                    <h3>{props.wordData.pronounce}</h3>
                                </div>
                                <div className="word">
                                    <h1>{props.wordData.word}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="card-under">
                            <h3>意味</h3>
                            <p>{props.wordData.mean}</p>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
};


export default DescModal;
