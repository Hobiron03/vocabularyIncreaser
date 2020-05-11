import React from 'react';
import './Topic.css';


import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

const Topic = () => {

    const classes = useStyles();
    const [age, setAge] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as number);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <div className="topic-top">
                <h3>あつめたことば</h3>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={handleChange}
                    className={classes.formControl}
                >
                    <MenuItem value="全て">
                        全て
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>

            </div>
            <p className="count-word">30 words</p>
        </div>
    )
};

export default Topic;
