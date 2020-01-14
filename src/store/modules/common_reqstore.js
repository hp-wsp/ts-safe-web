import types from '../types.js';
import {post,get,dele,put} from '@/utils/serviceHelper.js';

const state={
    checkTypeList: [],
}

const getters={
    checkTypeList(state) {
        return state.checkTypeList;
    },
}

const actions={
    uploadResource({commit, state}, param) {
        return new Promise((resolve, reject) => {
            post('/comm/resource', param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                } else {
                    reject(res.resultMessage);
                }
            })
        });
    },
    getCheckTypeList({commit, state}, param) {
        get('/man/check/type', {...param}).then((res) => {
            if (res.code==0) {
                commit(types.CHECK_TYPE_LIST, res);
            }
        })
    },
    getCheckTableList({commit, state}, param) {
        return new Promise((resolve, reject) => {
            get('/man/check/content/item/'+param.itemId, param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                }else{
                    reject(res.resultMessage);
                }
            })
        });
    },
    getBaseSuperviseChildrenList({commit, state}, param) {
        return new Promise((resolve, reject) => {
            get('/man/indCtg/children/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                }else{
                    reject(res.resultMessage);
                }
            })
        });
    },
    getBaseSuperviseInfo({commit, state}, param) {
        return new Promise((resolve, reject) => {
            get('/man/supervise/'+param.id, param).then((res) => {
                if (res.code==0) {
                    resolve(res.rs);
                }else{
                    reject(res.resultMessage);
                }
            })
        });
    },
}
const mutations={
    [types.CHECK_TYPE_LIST](state, data) {
        data.rs[0].items.forEach(function (item) {
            item.checkTableSelect=[];
        })

        data.rs[1].items.forEach(function (item) {
            item.checkTableSelect=[];
        })
        state.checkTypeList = data.rs;
    }

}

export default {
	state,
	getters,
	actions,
	mutations
}
