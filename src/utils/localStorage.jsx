import _ from "lodash";

const setItem_LS = (value) => {
    localStorage.setItem('user', JSON.stringify(value));
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

const getUsername_LS = () => {
    const { username } = JSON.parse(localStorage.getItem('user'));
    return _.startCase(_.toLower(username));
}

export { setItem_LS, getItem_LS, clear_LS, isItem_LS, getUsername_LS };