import React, { useState } from 'react';
import './Card.css';
import Paper from '@material-ui/core/Paper';
import DescModal from '../DescModal/DescModal';

interface WordInfo {
    id: number;
    user_id: number;
    word: string;
    mean: string;
    pronounce: string;
    genre: string;
    color: string;
};

interface CardProps {
    wordData: WordInfo;
};

const Card = (props: CardProps) => {

    const [isDescModalOpen, setIsDescModalOpen] = useState(false);

    const DescModalWindow = () => {
        if (isDescModalOpen) {
            return <DescModal toggleModalState={() => toggleModalState()} wordData={props.wordData} />
        }

        return;
    };

    const toggleModalState = () => {
        setIsDescModalOpen(false);

        console.log(`toddle!!! ${isDescModalOpen}`);
    };

    return (
        <div>
            {DescModalWindow()}
            <div onClick={() => setIsDescModalOpen(true
            )}>
                <div className="card-list">

                    <div className="card">
                        <Paper elevation={3} square>
                            <div className="top" style={{ backgroundColor: props.wordData.color }} >
                                <p>{props.wordData.word}</p>
                            </div>

                            <div className="under">
                                <p>{props.wordData.mean}</p>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;