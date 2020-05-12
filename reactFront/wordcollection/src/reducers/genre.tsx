import {
    ADD_GENRE
} from '../actions/index';


interface genreAction {
    type: string,
    genre: string,
}

const genre = (state = [], action: genreAction) => {
    switch (action.type) {
        case ADD_GENRE:
            return state;

        default:
            return state;
    }
}

export default genre;