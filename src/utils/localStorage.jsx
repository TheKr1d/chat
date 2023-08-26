const setItem_LS = (value) => {
    localStorage.setItem('user', value);
}

const getItem_LS = () => {
    return localStorage.getItem('user');
}

const clear_LS = () => {
    localStorage.clear();
}

const isItem_LS = () => {
    return localStorage.length > 0;
}

export { setItem_LS, getItem_LS, clear_LS, isItem_LS };