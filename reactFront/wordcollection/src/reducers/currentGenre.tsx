import {
    SET_CURRENT_GENRE,
} from '../actions/index';


interface genreAction {
    type: string,
    currentGenre: string,
}

const genre = (state: string[] = [], action: genreAction): string[] => {
    switch (action.type) {
        case SET_CURRENT_GENRE:
            const newState = [action.currentGenre];
            return newState;

        default:
            return state;
    }
}

export default genre;