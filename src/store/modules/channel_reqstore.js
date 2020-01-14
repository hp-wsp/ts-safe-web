import types from '../types.js';
import {post, get, dele, put} from '@/utils/serviceHelper.js';

const state = {
    channelList: [],
    channelPage: {page: 1, rows: 10, count: 0}
}

const getters = {
    channelList(state) {
        return state.channelList;
    },
    channelPage(state) {
        return state.channelPage;
    }
}

const actions = {
    getChannelList({commit, state}, param) {
        get('/sys/channel', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.CHANNEL_LIST_LIST, res);
            }
        })
    },
    channelPageChange({commit, state, dispatch}, param) {
        commit(types.CHANNEL_LIST_PAGE, param.page);
        dispatch('getChannelList', param);
    },

    addChannel({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/sys/channel', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },

    editChannel({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/sys/channel', param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    openChannel({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/sys/channel/open/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    closeChannel({commit, state}, param) {
        return new Promise((resolve, reject) => {
            put('/sys/channel/close/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    deleteChannel({commit, state}, param) {
        return new Promise((resolve, reject) => {
            dele('/sys/channel/'+param.id, param).then((res) => {
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
    [types.CHANNEL_LIST_LIST](state, data) {
        state.channelList = data.rs;
        state.channelPage.count = data.count;
    },
    [types.CHANNEL_LIST_PAGE](state, data) {
        state.channelPage.page = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
