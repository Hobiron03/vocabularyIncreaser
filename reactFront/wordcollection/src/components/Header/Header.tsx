import React, { useState } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';

import AddModal from '../AddModal/AddModal';




const Header = () => {
    const classes = useStyles();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    }

    const anchor = "left";
    return (
        <div className={classes.grow} >
            <Drawer anchor={anchor} open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }}>
                <ul>
                    <li>こんにちは</li>
                    <li>こんにちは</li>
                    <li>こんにちは</li>
                    <li>こんにちは</li>
                </ul>
            </Drawer>
            <AppBar position="static" style={{ background: '#037DE5' }}>
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