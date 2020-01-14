import md5 from 'js-md5';
import {Message} from 'element-ui';
import types from '../types.js';
import {get, post, setToken, put} from '../../utils/serviceHelper.js';
import storageHelper from '../../utils/storageHelper';

const state = {
    userInfo: null,
    loginToken: ''
}

const getters = {
    userInfo(state) {
        return state.userInfo;
    },
    loginToken(state) {
        return state.loginToken;
    }
}

const actions = {
    loginQuit({commit, state}) {
        commit(types.USER_INFO, null);
        commit(types.LOGIN_TOKEN, '');
        setToken('');

        storageHelper.remove('token');
        storageHelper.remove('userInfo');
    },
    loginSen({commit, state, dispatch}, param) {
        return new Promise((resolve, reject) => {
            post('/man/main/login', param).then((res) => {
                if (res.code == 0) {
                    commit(types.USER_INFO, res.rs.user);
                    commit(types.LOGIN_TOKEN, res.rs.token);
                    setToken(res.rs.token);

                    storageHelper.set('token', res.rs.token);
                    storageHelper.set('userInfo', res.rs.user);

                    resolve(res.rs);
                } else {
                    // reject(res.messages[0]);
                }
            })
        });
    },
    forgetPasswordReq({commit, state}, param) {

        return new Promise((resolve, reject) => {
            get('/manage/main/smsPassword', param).then((res) => {
                if(res){
                    resolve(res.rs.result);
                }
            })

        });
    },
    setLogin({commit, state, dispatch}, param) {
        commit(types.USER_INFO, param.userInfo);
        commit(types.LOGIN_TOKEN, param.token);
        setToken(param.token);
    },
    updateAccount({commit, state}, param) {

        return new Promise((resolve, reject) => {
            put('/adminMarket/marketAdmin/', param).then((res) => {
                if (res.success) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    updatePassword({commit, state}, param) {
        let mSend = {
            newPassword: md5(param.newPassword),
            oldPassword: md5(param.password)
        }
        return new Promise((resolve, reject) => {
            put('/adminMarket/adminUpdatePass/', mSend).then((res) => {
                if (res.success) {
                    resolve(res.result);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    }
}
const mutations = {
    [types.USER_INFO](state, data) {
        try {
            state.userInfo = JSON.parse(data);
        } catch (e) {
        }
    },
    [types.LOGIN_TOKEN](state, data) {
        state.loginToken = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
