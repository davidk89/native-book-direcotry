import { LOAD_BOOKS, LOAD_BOOK, SET_CURRENT_LIST } from "../constatns/action-types";

const initialState = {
    loadedBooks: [],
    currentList: [],
    book: {}
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_BOOKS:
            return { ...state, loadedBooks: action.data, currentList: action.data };
        case LOAD_BOOK:
            return { ...state, book: action.data };
        case SET_CURRENT_LIST:
            return { ...state, currentList: action.data };
        default:
            return state;
    }
};

export default rootReducer;