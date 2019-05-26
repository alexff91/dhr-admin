import {Registration, Tokens, Users} from '../api';

export const createToken = ({commit}, {username, password}) => {
    return Tokens.getToken({
        username: username.trim(),
        password: password.trim()
    })
        .then(res => {
            commit('CHANGE_SESSION', {token: res.data.token});
            return res.data.token;
        });
};

export const createCompany = ({commit}, {username, password, company, phone}) => {
    return Registration.register({
        username: username.trim(),
        password: password.trim(),
        company: company.trim(),
        phone: phone.trim()
    })
        .then(res => {
            return Tokens.getToken({
                username: username.trim(),
                password: password.trim()
            })
                .then(res => {
                    commit('CHANGE_SESSION', {token: res.data.token});
                    return res.data.token;
                });
        });
};

export const checkToken = ({commit, getters}) => {
    return new Promise((resolve) => {
        // validate local store
        if (!getters.session.token) {
            return resolve(false);
        }
        // remote
        Tokens.get()
            .then(() => resolve(true))
            .catch(() => {
                commit('CHANGE_SESSION', {token: null});
                resolve(false);
            });
    });
};

export const deleteToken = ({commit}) => {
    commit('CHANGE_SESSION', {token: null});
};

export const getUserAndCompany = ({commit}) => {
    return Users.get('me')
        .then(res => {
            commit('CHANGE_USER', res.data);
            commit('CHANGE_COMPANY', res.data.company);
        });
};

export const clearUserAndCompany = ({commit}) => {
    commit('CHANGE_USER', null);
    commit('CHANGE_COMPANY', null);
};

export const setCompany = ({commit}, company) => {
    commit('CHANGE_COMPANY', company);
};

export const toggleSidebarCollapse = ({commit}) => {
    commit('TOGGLE_SIDEBAR_COLLAPSE');
};