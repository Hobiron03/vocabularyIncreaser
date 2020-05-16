import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './AddModal.css';

interface AddModal {
    toggleModalState: Function;
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
                border: `5px solid ${borderColor}`,
                padding: theme.spacing(2, 4, 3),
                width: 450,
                transition: "all 0.2s"
            },
            colorBallet: {
                border: "2px solid #000000",
            }
        }),
    );

    const [borderColor, setBorderColor] = useState<string>("#69BFF5");

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
        setBorderColor(color);
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
                                <TextField id="outlined-basic" variant="outlined" size="small" fullWidth={true} />
                            </div>

                            <div className="form-element">
                                <p>ことばの読み方</p>
                                <TextField id="outlined-basic" variant="outlined" size="small" fullWidth={true} />
                            </div>

                            <div className="form-element">
                                <p>ことばの意味</p>
                                <TextField id="outlined-basic" variant="outlined" size="small" fullWidth={true} multiline={true} />
                            </div>

                            <div className="form-element">
                                <p>ジャンル</p>
                                <TextField id="outlined-basic" variant="outlined" size="small" multiline={true} />
                            </div>

                            <div className="form-element">
                                <p>カラー</p>
                                <div className="color-selections">
                                    <div className={
                                        [
                                            "color",
                                            borderColor === COLORS.WATERBLUE ? classes.colorBallet : ""
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
                                            borderColor === COLORS.ORANGE ? classes.colorBallet : ""
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
                                            borderColor === COLORS.PINK ? classes.colorBallet : ""
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
                                            borderColor === COLORS.NAVIBLUE ? classes.colorBallet : ""
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
                                            borderColor === COLORS.GREEN ? classes.colorBallet : ""
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
                                            borderColor === COLORS.PURPLE ? classes.colorBallet : ""
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
                                    backgroundColor: borderColor,
                                    marginTop: 30,
                                }}
                            >
                                <p className="add-button">追加する</p>
                            </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddModal;
