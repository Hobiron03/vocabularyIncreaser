import React from 'react';
import './Card.css';
import Paper from '@material-ui/core/Paper';
import { Color, colors } from '@material-ui/core';

interface CardProps {
    word: string;
    mean: string;
    color: string;
};

const Card = (props: CardProps) => {

    return (
        <div>
            <div className="card-list">
                <div className="card">
                    <Paper elevation={3} square>
                        <div className="top" style={{ backgroundColor: props.color }} >
                            <p>{props.word}</p>
                        </div>

                        <div className="under">
                            <p>{props.mean}</p>
                        </div>
                    </Paper>
                </div>

            </div>
        </div>
    )
}

export default Card;