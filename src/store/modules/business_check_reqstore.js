import types from '../types.js';
import {post, get, dele, put} from '@/utils/serviceHelper.js';

const state = {
    checkTaskList: [],
    checkTaskPage: {page: 1, rows: 10, count: 0}
}

const getters = {
    checkTaskList(state) {
        return state.checkTaskList;
    },
    checkTaskPage(state) {
        return state.checkTaskPage;
    }
}

const actions = {

    getCheckTaskList({commit, state}, param) {
        get('/man/checkTask', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.CHECKTASK_LIST_LIST, res);
            }
        })
    },
    checkTaskPageChange({commit, state, dispatch}, param) {
        commit(types.CHECKTASK_LIST_PAGE, param.page);
        dispatch('getCheckTaskList', param);
    },
    addCheckTask({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/man/checkTask', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    editCheckTask({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/man/checkTask', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteCheckTask({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/man/checkTask/'+param.id, param).then((res) => {
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
    [types.CHECKTASK_LIST_LIST](state, data) {
        state.checkTaskList = data.rs;
        state.checkTaskPage.count = data.count;
    },
    [types.CHECKTASK_LIST_PAGE](state, data) {
        state.checkTaskPage.page = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
