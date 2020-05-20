import React, { useState, useEffect, useContext } from 'react';
import './Header.css';
import AddModal from '../AddModal/AddModal';
import decodeJWT from '../../decode-jwt';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
    DELETE_ALL_WORD,
} from '../../actions';

import {
    useHistory,
} from 'react-router-dom';
import AppContext from '../../contexts/AppContext';


const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const { state, dispatch } = useContext(AppContext);


    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [usrName, setUsrName] = useState<string>("");

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            const decodedJWT = decodeJWT(jwt);
            const username = decodedJWT['username'];
            setUsrName(username);
        }
    }, []);

    const searchWord = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    const AddModalWindow = () => {
        if (isModalOpen) {
            return <AddModal toggleModalState={() => { toggleModalState() }} />
        }
        return;
    };

    const toggleModalState = () => {
        setIsModalOpen(!isModalOpen);
    };

    const logout = () => {
        localStorage.setItem('jwt', "");
        dispatch({
            type: DELETE_ALL_WORD,
        });
        history.push("/");
    };


    const anchor = "left";
    return (
        <div className={classes.grow} >
            <Drawer anchor={anchor} open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }}>
                <div className="drawer">
                    <div className="">
                        <h3 className="username">{usrName} さん</h3>
                    </div>
                    <div className="drawer-button" style={{ marginBottom: 100 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            startIcon={<MeetingRoomIcon />}
                            style={{ width: 180 }}
                            onClick={() => logout()}
                        >
                            <h4 className="drawer-button-text">ログアウト</h4>
                        </Button>
                    </div>
                    <div className="drawer-button">
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteForeverIcon />}
                            style={{ width: 180 }}
                        >
                            <h4 className="drawer-button-text">全データ削除</h4>
                        </Button>
                    </div>

                    <div className="drawer-button">
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AccountCircleIcon />}
                            style={{ width: 180 }}
                        >
                            <h4 className="drawer-button-text">アカウント削除</h4>
                        </Button>
                    </div>
                </div>
            </Drawer>

            <AppBar position="sticky" style={{ background: '#037DE5' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => {
                            setIsDrawerOpen(true)
                            console.log(isDrawerOpen);

                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        ことばあつめ
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => searchWord(e)}
                        />
                    </div>
                    <IconButton aria-label="show 4 new mails" color="inherit" size="medium"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PostAddRoundedIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {AddModalWindow()}
        </div >
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);


export default Header