import {
    ADD_NEW_WORD,
    DELETE_WORD,
    DELETE_ALL_WORD,
} from '../actions/index';

interface wordData {
    id: number;
    user_id: number;
    word: string;
    mean: string;
    pronounce: string;
    genre: string;
    color: string;
};

interface wordAction {
    type: string;
    word: wordData;
    currentGenre: string;
};

const words = (state: wordData[] = [], action: wordAction): wordData[] => {
    switch (action.type) {
        case ADD_NEW_WORD:
            const newWord = action.word;
            return [...state, newWord];
        case DELETE_WORD:
            const newState = state.filter((word: wordData) => word.id !== action.word.id);
            return newState;
        case DELETE_ALL_WORD:
            return [];
        default:
            return state;
    }
};

export default words;