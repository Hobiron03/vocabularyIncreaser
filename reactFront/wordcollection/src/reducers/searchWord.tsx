import {
    SET_SEARCH_WORD
} from '../actions/index';

interface searchWord {
    searchWord: string
};

const searchWord = (state = "", action) => {
    switch (action.type) {
        case SET_SEARCH_WORD:
            return action.searchWord;
        default:
            return state;
    }
};

export default searchWord;