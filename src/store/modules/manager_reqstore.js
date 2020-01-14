import types from '../types.js';
import {post, get, dele, put} from '@/utils/serviceHelper.js';

const state = {
    managerList: [],
    managerPage: {page: 0, rows: 10, count: 0}
}

const getters = {
    managerList(state) {
        return state.managerList;
    },
    managerPage(state) {
        return state.managerPage;
    }
}

const actions = {
    getManagerList({commit, state}, param) {
        get('/man/member', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.MANAGER_LIST_LIST, res);
            }
        })
    },
    managerPageChange({commit, state, dispatch}, param) {
        commit(types.MANAGER_LIST_PAGE, param.page);
        dispatch('getManagerList', param);
    },
    addManager({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/man/member', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    resetPasswordManager({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/man/member/resetPassword', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editManager({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/man/member', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteManager({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/man/member/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    }
}
const mutations = {
    [types.MANAGER_LIST_LIST](state, data) {
        state.managerList = data.rs;
        state.managerPage.count = data.count;
    },
    [types.MANAGER_LIST_PAGE](state, data) {
        state.managerPage.page = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
