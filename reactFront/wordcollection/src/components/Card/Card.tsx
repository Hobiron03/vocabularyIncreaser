import React from 'react';
import './Card.css';
import Paper from '@material-ui/core/Paper';

const Card = () => {
    return (
        <div>
            <div className="card-list">
                <div className="card">
                    <Paper elevation={3} square>
                        <div className="top">
                            <h3>ことば</h3>
                        </div>

                        <div className="under">
                        </div>
                    </Paper>
                </div>
                <div className="card">
                    <Paper elevation={3} square>
                        Hello
                    </Paper>
                </div>
                <div className="card">
                    <Paper elevation={3} square>
                        Hello
                    </Paper>
                </div>
                <div className="card">
                    <Paper elevation={3} square>
                        Hello
                    </Paper>
                </div>
                <div className="card">
                    <Paper elevation={3} square>
                        Hello
                    </Paper>
                </div>
                <div className="card">
                    <Paper elevation={3} square>
                        Hello
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Card;