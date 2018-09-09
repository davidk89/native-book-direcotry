import { LOAD_BOOKS, LOAD_BOOK, SET_CURRENT_LIST } from "../constatns/action-types";

const loadBooks = data => ({ type: LOAD_BOOKS, data: data });
const loadBook = data => ({ type: LOAD_BOOK, data: data });
const setCurrentList = data => ({ type: SET_CURRENT_LIST, data: data });

export {loadBooks, loadBook, setCurrentList}